// =========================================================
// Fork — Business Management  |  server.js
// Serves the landing page + handles newsletter sign-ups and
// sends a welcome email to each new subscriber.
// =========================================================
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const app = express();
app.use(express.json());
app.use(express.static(ROOT)); // serve index.html, css, js, assets

const {
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PORT = "465",
  SMTP_USER,
  SMTP_PASS,
  FROM_NAME = "Fork",
  PORT = "3000",
} = process.env;

// ---- mail transport ----
let transporter = null;
if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  transporter.verify().then(
    () => console.log("✓ SMTP ready — welcome emails will be sent"),
    (err) => console.warn("⚠ SMTP not ready:", err.message)
  );
} else {
  console.warn(
    "⚠ SMTP_USER / SMTP_PASS not set in .env — sign-ups will be saved but NO email is sent."
  );
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function welcomeHtml(email) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0f0e47;padding:40px 0">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
      <div style="background:#683fea;padding:28px 32px">
        <span style="color:#fff;font-size:24px;font-weight:700">/ Fork</span>
      </div>
      <div style="padding:32px">
        <h1 style="margin:0 0 12px;font-size:22px;color:#0f0e47">Welcome to Fork! 🎉</h1>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#444">
          Thanks for subscribing with <b>${email}</b>. You're now on the list for
          product launches, financial tips, and exclusive offers.
        </p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#444">
          We're excited to help you manage, optimize, and scale your business.
        </p>
        <a href="#" style="display:inline-block;background:#683fea;color:#fff;text-decoration:none;
           padding:12px 28px;border-radius:50px;font-size:14px;font-weight:600">Explore Fork</a>
        <p style="margin:28px 0 0;font-size:12px;color:#999">
          © 2025 Fork. You received this because you subscribed on our website.
        </p>
      </div>
    </div>
  </div>`;
}

// ---- subscribe endpoint ----
app.post("/api/subscribe", async (req, res) => {
  const email = (req.body?.email || "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
  }

  // save subscriber (simple append-only log)
  try {
    fs.appendFileSync(
      path.join(__dirname, "subscribers.log"),
      `${new Date().toISOString()}\t${email}\n`
    );
  } catch (e) {
    console.warn("Could not write subscribers.log:", e.message);
  }

  // send welcome email
  if (!transporter) {
    return res.json({
      ok: true,
      message: "Subscribed! (Email sending is not configured yet.)",
    });
  }

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: email,
      subject: "Welcome to Fork 🎉",
      html: welcomeHtml(email),
      text: `Welcome to Fork! Thanks for subscribing with ${email}. You're now on the list for product launches, tips, and exclusive offers.`,
    });
    return res.json({ ok: true, message: "Welcome email sent — check your inbox!" });
  } catch (err) {
    console.error("sendMail error:", err.message);
    return res.status(500).json({ ok: false, message: "Could not send the email right now. Try again later." });
  }
});

app.listen(Number(PORT), () => {
  console.log(`\n▶ Fork running at  http://localhost:${PORT}\n`);
});
