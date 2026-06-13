import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
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
  const { userEmail, userFullName, bookingReference, doctorName, doctorSpecialty, doctorRating, doctorLocation, doctorAddress, appointmentDate, appointmentTime, duration, fees } = body;

  if (!userEmail || !userFullName || !bookingReference) {
    return NextResponse.json({ error: "User email, full name, and booking reference are required." }, { status: 400 });
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.error("Appointment email error: SMTP_USER and SMTP_PASS are not configured in environment variables.");
    return NextResponse.json(
      { error: "SMTP_USER and SMTP_PASS are not configured in environment variables." },
      { status: 501 }
    );
  }

  try {
    const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007BFF; padding-bottom: 20px;">
            <h2 style="color: #032B5B; margin: 0; font-size: 24px;">Appointment Confirmation</h2>
            <p style="color: #64748B; margin: 5px 0 0 0;">Your appointment has been successfully booked</p>
          </div>

          <!-- Greeting -->
          <p style="color: #032B5B; font-size: 16px; margin-bottom: 20px;">Dear <strong>${userFullName}</strong>,</p>
          <p style="color: #64748B; font-size: 14px; margin-bottom: 20px; line-height: 1.6;">Thank you for booking your appointment with Doccure. Your appointment details are listed below. Please save this confirmation for your records.</p>

          <!-- Booking Reference -->
          <div style="background-color: #F4F9FF; border-left: 4px solid #007BFF; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: #64748B; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Booking ID</p>
            <p style="color: #032B5B; font-size: 18px; font-weight: bold; font-family: monospace; margin: 0;">${bookingReference}</p>
          </div>

          <!-- Appointment Details -->
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #032B5B; margin: 0 0 15px 0; font-size: 16px;">Appointment Details</h3>

            <!-- Doctor Info -->
            <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">
              <p style="color: #64748B; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Doctor</p>
              <p style="color: #032B5B; font-size: 14px; font-weight: bold; margin: 0;">${doctorName}</p>
              <p style="color: #4E46E5; font-size: 13px; margin: 5px 0 0 0;">${doctorSpecialty}</p>
              <p style="color: #64748B; font-size: 12px; margin: 3px 0 0 0;">Rating: ${doctorRating.toFixed(1)} ⭐</p>
            </div>

            <!-- Date & Time -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
              <div>
                <p style="color: #64748B; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Date</p>
                <p style="color: #032B5B; font-size: 14px; font-weight: bold; margin: 0;">${appointmentDate}</p>
              </div>
              <div>
                <p style="color: #64748B; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Time</p>
                <p style="color: #032B5B; font-size: 14px; font-weight: bold; margin: 0;">${appointmentTime}</p>
              </div>
            </div>

            <!-- Location & Duration -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
              <div>
                <p style="color: #64748B; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Duration</p>
                <p style="color: #032B5B; font-size: 14px; font-weight: bold; margin: 0;">${duration}</p>
              </div>
              <div>
                <p style="color: #64748B; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; font-weight: bold;">Fees</p>
                <p style="color: #E04F16; font-size: 14px; font-weight: bold; margin: 0;">${fees}</p>
              </div>
            </div>
          </div>

          <!-- Location Info -->
          <div style="background-color: #FFF8F0; border-left: 4px solid #E04F16; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="color: #64748B; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; font-weight: bold;">Location</p>
            <p style="color: #032B5B; font-size: 14px; font-weight: bold; margin: 0;">${doctorLocation}</p>
            <p style="color: #64748B; font-size: 13px; margin: 5px 0 0 0; line-height: 1.5;">${doctorAddress}</p>
          </div>

          <!-- Important Notes -->
          <div style="background-color: #F4F9FF; border-left: 4px solid #007BFF; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="color: #032B5B; font-size: 13px; font-weight: bold; margin: 0 0 10px 0;">Important Information:</p>
            <ul style="color: #64748B; font-size: 12px; margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Please arrive 15 minutes before your appointment time</li>
              <li>Bring a valid ID and insurance card if applicable</li>
              <li>If you need to reschedule, contact us at least 24 hours in advance</li>
              <li>Payment will be collected at the clinic counter</li>
            </ul>
          </div>

          <!-- Footer Message -->
          <p style="color: #64748B; font-size: 13px; margin: 20px 0 0 0; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            If you have any questions, please reply to this email or contact us at <strong>muhammadaliraza7530@gmail.com</strong>
          </p>

          <!-- Signature -->
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #4E46E5; font-size: 14px; font-weight: bold; margin: 0;">Doccure Team</p>
            <p style="color: #64748B; font-size: 12px; margin: 5px 0 0 0;">Your trusted healthcare appointment platform</p>
          </div>

        </div>
      </div>
    `;

    const emailText = `
Appointment Confirmation

Dear ${userFullName},

Your appointment has been successfully booked with Doccure.

BOOKING ID: ${bookingReference}

APPOINTMENT DETAILS:
Doctor: ${doctorName}
Specialty: ${doctorSpecialty}
Rating: ${doctorRating.toFixed(1)} stars
Date: ${appointmentDate}
Time: ${appointmentTime}
Duration: ${duration}
Fees: ${fees}

LOCATION:
${doctorLocation}
${doctorAddress}

IMPORTANT:
- Please arrive 15 minutes before your appointment time
- Bring a valid ID and insurance card if applicable
- If you need to reschedule, contact us at least 24 hours in advance
- Payment will be collected at the clinic counter

If you have any questions, please contact us at muhammadaliraza7530@gmail.com

Best regards,
Doccure Team
Your trusted healthcare appointment platform
    `;

    await nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }).sendMail({
      from: `Doccure <${fromAddress}>`,
      to: userEmail,
      subject: `Appointment Confirmation - Booking ID: ${bookingReference}`,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Appointment confirmation email sent successfully." });
  } catch (error) {
    console.error("Appointment email error:", error);
    const message = error instanceof Error ? error.message : "Unable to send appointment confirmation email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
