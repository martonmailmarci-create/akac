import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, company, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    await resend.emails.send({
      from: "AKAC Studio <contact@akac.studio>",
      to: ["info@akac.studio"],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111111;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">New contact form submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;"><a href="mailto:${email}" style="color: #ED6D40;">${email}</a></td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666;">Company</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${company}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #666; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
