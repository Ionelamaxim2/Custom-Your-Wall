import { NextResponse } from "next/server";

// Basic in-memory rate limiter (per process) – production should use a shared store
const ipHits = new Map(); // ip -> { count, first }
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_HITS = 15; // max requests per minute per IP

// Per-email rate limit
const emailHits = new Map(); // email -> { count, first, last }
const WINDOW_EMAIL_MS = 60 * 1000; // 1 minute
const MAX_EMAIL_HITS = 5; // max per minute per email
const MIN_INTERVAL_MS = 10 * 1000; // min 10s between sends for same email

function rateLimit(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip) || { count: 0, first: now };
  // reset window
  if (now - entry.first > WINDOW_MS) {
    entry.count = 0;
    entry.first = now;
  }
  entry.count += 1;
  ipHits.set(ip, entry);
  return entry.count <= MAX_HITS;
}

function rateLimitEmail(email) {
  const now = Date.now();
  const entry = emailHits.get(email) || { count: 0, first: now, last: 0 };
  if (now - entry.first > WINDOW_EMAIL_MS) {
    entry.count = 0;
    entry.first = now;
  }
  if (entry.last && now - entry.last < MIN_INTERVAL_MS) return false;
  entry.count += 1;
  entry.last = now;
  emailHits.set(email, entry);
  return entry.count <= MAX_EMAIL_HITS;
}

function sanitize(input) {
  if (typeof input !== "string") return "";
  // strip HTML tags and trim
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}

function hasUrl(text) {
  return /(https?:\/\/|www\.)/i.test(text || "");
}

function isValidEmail(email) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email || "");
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    if (
      req.headers.get("content-type")?.includes("application/json") !== true
    ) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    // Honeypot field – must be empty
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const name = sanitize(body.name).slice(0, 100);
    const email = sanitize(body.email).slice(0, 120);
    const phone = sanitize(body.phone).slice(0, 30);
    const message = sanitize(body.message).slice(0, 1000);
    const country = sanitize(body.country || "");
    const nda = Boolean(body.nda);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    // Enforce .com emails only
    if (!/\.com$/i.test(String(email).trim().toLowerCase())) {
      return NextResponse.json(
        { error: "Email must be .com" },
        { status: 400 }
      );
    }
    if (hasUrl(message)) {
      return NextResponse.json(
        { error: "Links are not allowed in the message" },
        { status: 400 }
      );
    }

    if (!rateLimitEmail(email)) {
      return NextResponse.json(
        { error: "Too many requests for this email" },
        { status: 429 }
      );
    }

    // Accept multiple env names; fallback to Hostinger defaults if only EMAIL_USER/PASS exist
    const SMTP_HOST =
      process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.hostinger.com";
    const parsedPort = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT);
    const SMTP_PORT = Number.isFinite(parsedPort) ? parsedPort : 465;
    const rawSecure = process.env.SMTP_SECURE || process.env.EMAIL_SECURE;
    const SMTP_SECURE =
      typeof rawSecure === "string"
        ? rawSecure
        : SMTP_PORT === 465
        ? "true"
        : "false";
    const SMTP_USER = process.env.SMTP_USER || process.env.EMAIL_USER || "";
    const SMTP_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
    const MAIL_TO = process.env.MAIL_TO || process.env.EMAIL_TO || SMTP_USER;
    const MAIL_FROM =
      process.env.MAIL_FROM || process.env.EMAIL_FROM || SMTP_USER;

    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "Server email not configured" },
        { status: 500 }
      );
    }

    let nodemailer;
    try {
      nodemailer = (await import("nodemailer")).default;
    } catch (e) {
      return NextResponse.json(
        { error: "Email service not available" },
        { status: 500 }
      );
    }

    const primarySecure =
      String(SMTP_SECURE || "false").toLowerCase() === "true";
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: primarySecure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      connectionTimeout: 10000,
      socketTimeout: 15000,
    });

    const subject = `New Contact Form – ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Country: ${country || "-"}`,
      `NDA Requested: ${nda ? "Yes" : "No"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    try {
      await transporter.sendMail({
        from: MAIL_FROM || SMTP_USER,
        to: MAIL_TO,
        replyTo: email,
        subject,
        text,
      });
    } catch (firstErr) {
      // Fallback: flip between 465/587 if initial attempt fails
      const altPort = SMTP_PORT === 465 ? 587 : 465;
      const altSecure = altPort === 465;
      const altTransporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: altPort,
        secure: altSecure,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
        connectionTimeout: 10000,
        socketTimeout: 15000,
      });
      try {
        await altTransporter.sendMail({
          from: MAIL_FROM || SMTP_USER,
          to: MAIL_TO,
          replyTo: email,
          subject,
          text,
        });
      } catch (secondErr) {
        const dev = process.env.NODE_ENV !== "production";
        if (dev) {
          console.error("Email send failed (primary)", firstErr);
          console.error("Email send failed (fallback)", secondErr);
          return NextResponse.json(
            {
              error: "Failed to send",
              details: {
                primary: String(firstErr?.message || firstErr),
                fallback: String(secondErr?.message || secondErr),
                hostTried: SMTP_HOST,
                portsTried: [SMTP_PORT, SMTP_PORT === 465 ? 587 : 465],
                secureTried: [primarySecure, SMTP_PORT === 465 ? false : true],
              },
            },
            { status: 500 }
          );
        }
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const dev = process.env.NODE_ENV !== "production";
    if (dev) {
      console.error("Email API error", err);
      return NextResponse.json(
        { error: "Failed to send", details: String(err?.message || err) },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  // Validate phone length (7-15 digits)
  const phoneDigits = String(phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }
}
