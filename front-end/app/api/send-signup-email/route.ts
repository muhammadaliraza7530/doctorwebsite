import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const adminEmail = "muhammadaliraza7530@gmail.com";

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured in environment variables.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email } = body;

  if (!fullName || !email) {
    return NextResponse.json({ error: "Full name and email are required." }, { status: 400 });
  }

  try {
    const transporter = createTransporter();
    const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `Doccure <${fromAddress}>`,
      to: adminEmail,
      subject: `New signup from ${fullName}`,
      text: `A new user signed up for Doccure.\n\nName: ${fullName}\nEmail: ${email}\n`,
      html: `<p>A new user signed up for Doccure.</p><ul><li><strong>Name:</strong> ${fullName}</li><li><strong>Email:</strong> ${email}</li></ul>`,
    });

    await transporter.sendMail({
      from: `Doccure <${fromAddress}>`,
      to: email,
      subject: `Welcome to Doccure, ${fullName}!`,
      text: `Hello ${fullName},\n\nThank you for signing up at Doccure. We're excited to help you manage your appointments and connect with doctors.\n\nBest regards,\nThe Doccure Team`,
      html: `<p>Hello ${fullName},</p><p>Thank you for signing up at <strong>Doccure</strong>. We're excited to help you manage your appointments and connect with doctors.</p><p>Best regards,<br/>The Doccure Team</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup email error:", error);
    const message = error instanceof Error ? error.message : "Unable to send email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
