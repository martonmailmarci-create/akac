import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes.
// Resets on cold start, which is acceptable for a contact form.
const submissions = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

const autoReplyHtml = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo / Brand -->
          <tr>
            <td style="padding-bottom:48px;">
              <span style="font-size:13px;font-weight:600;letter-spacing:0.18px;text-transform:uppercase;color:#F9F9F4;">AKAC STUDIO</span>
            </td>
          </tr>

          <!-- Orange accent bar -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="width:32px;height:5px;background-color:#ED6D40;border-radius:2px;"></div>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding-bottom:20px;">
              <h1 style="margin:0;font-size:32px;font-weight:600;color:#F9F9F4;letter-spacing:-0.8px;line-height:1.1;">
                MESSAGE<br/>RECEIVED.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:40px;">
              <p style="margin:0;font-size:15px;font-weight:500;color:rgba(249,249,244,0.55);line-height:1.7;">
                Hey ${name}, thanks for reaching out.<br/>
                We've got your message and will be back in touch within 24 hours.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:40px;">
              <div style="height:1px;background-color:rgba(249,249,244,0.08);"></div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:12px;">
              <p style="margin:0 0 20px;font-size:12px;font-weight:600;letter-spacing:0.18px;text-transform:uppercase;color:rgba(249,249,244,0.3);">
                CAN'T WAIT? SKIP THE QUEUE.
              </p>
              <a href="https://akac.studio/contact"
                style="display:inline-block;padding:12px 28px;background-color:#ED6D40;color:#F9F9F4;text-decoration:none;font-size:11px;font-weight:600;letter-spacing:0.18px;text-transform:uppercase;border-radius:8px;">
                BOOK A 15-MINUTE CALL
              </a>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:48px;"></td></tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px;background-color:rgba(249,249,244,0.08);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:500;color:rgba(249,249,244,0.25);text-transform:uppercase;letter-spacing:0.18px;">AKAC STUDIO</p>
                    <p style="margin:0;font-size:11px;color:rgba(249,249,244,0.2);">
                      <a href="mailto:info@akac.studio" style="color:rgba(249,249,244,0.2);text-decoration:none;">info@akac.studio</a>
                      &nbsp;·&nbsp;
                      <a href="https://akac.studio" style="color:rgba(249,249,244,0.2);text-decoration:none;">akac.studio</a>
                    </p>
                  </td>
                  <td align="right">
                    <a href="https://instagram.com/akac.studio" style="font-size:11px;color:rgba(249,249,244,0.25);text-decoration:none;text-transform:uppercase;letter-spacing:0.18px;margin-left:16px;">IG</a>
                    <a href="https://linkedin.com/company/akac-studio" style="font-size:11px;color:rgba(249,249,244,0.25);text-decoration:none;text-transform:uppercase;letter-spacing:0.18px;margin-left:16px;">LI</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const internalHtml = (name: string, company: string, email: string, message: string) => `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111111;">
  <h2 style="font-size:20px;font-weight:600;margin-bottom:24px;">New contact form submission</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#666;width:120px;">Name</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${name}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#666;">Email</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;"><a href="mailto:${email}" style="color:#ED6D40;">${email}</a></td>
    </tr>
    ${company ? `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#666;">Company</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-size:14px;">${company}</td>
    </tr>` : ""}
    <tr>
      <td style="padding:10px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#666;vertical-align:top;">Message</td>
      <td style="padding:10px 0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</td>
    </tr>
  </table>
</div>
`;

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, company, email, message, website } = body;

    // Honeypot — hidden field real users never fill in. Pretend success for bots.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" ||
        !name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (name.length > 200 || email.length > 320 || message.length > 5000 ||
        (typeof company === "string" && company.length > 200)) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeCompany = typeof company === "string" ? escapeHtml(company.trim()) : "";
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    // Send both emails in parallel
    await Promise.all([
      // Internal notification
      resend.emails.send({
        from: "AKAC Studio <contact@akac.studio>",
        to: ["info@akac.studio"],
        replyTo: email,
        subject: `New enquiry from ${name.trim().slice(0, 100)}`,
        html: internalHtml(safeName, safeCompany, safeEmail, safeMessage),
      }),
      // Auto-reply to sender
      resend.emails.send({
        from: "AKAC Studio <contact@akac.studio>",
        to: [email],
        replyTo: "info@akac.studio",
        subject: "We got your message — AKAC Studio",
        html: autoReplyHtml(safeName),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
