import { NextRequest, NextResponse } from "next/server"
import { executeInsert } from "@/lib/oracle"

export const runtime = 'edge'

function generateId(): string {
  return crypto.randomUUID()
}

export async function POST(request: NextRequest) {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const body = await request.json()
    const { name, email, phone, caseType, message } = body

    if (!name || !email || !phone || !caseType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const bookingId = generateId()

    // Insert into Oracle database (non-critical, continue even if fails)
    try {
      await executeInsert(
        `INSERT INTO bookings (id, name, email, phone, case_type, message, status, created_at, updated_at)
         VALUES (:id, :name, :email, :phone, :caseType, :message, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        {
          id: bookingId,
          name,
          email,
          phone,
          caseType,
          message: message || "",
        }
      )
    } catch (dbError) {
      console.error("[v0] Database insert error (non-critical):", dbError)
      // Email sending will still succeed even if database insert fails
    }

    // Send emails in background without awaiting (fire and forget)
    Promise.all([
      // Confirmation email to client
      resend.emails.send({
        from: "LawUp™ <noreply@mails.rks.ad>",
        to: email,
        subject: "Booking Confirmation - LawUp™ | RKS, Advocate",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f5f0; }
            .container { background-color: #f8f5f0; padding: 40px 20px; }
            .email-wrapper { background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 32px; text-align: center; }
            .logo-text { color: #c9a54d; font-size: 28px; font-weight: bold; margin: 0; }
            .tagline { color: #ffffff; font-size: 14px; margin: 8px 0 0; }
            .body { padding: 40px 32px; }
            .body h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 16px; }
            .body p { color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 16px; }
            .details-box { background-color: #f8f5f0; border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; margin: 24px 0; }
            .detail-row { margin: 12px 0; color: #666666; font-size: 15px; }
            .detail-label { font-weight: bold; color: #1a1a2e; }
            .cta-button { display: inline-block; background-color: #c9a54d; color: #1a1a2e; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 24px 0; text-align: center; }
            .footer { background-color: #f8f5f0; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer-title { color: #666666; font-size: 14px; font-weight: bold; }
            .footer-address { color: #999999; font-size: 12px; margin: 12px 0; }
            .footer-copy { color: #999999; font-size: 12px; margin-top: 16px; }
            .badge { display: inline-block; background-color: #c9a54d; color: #1a1a2e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <h1 class="logo-text">LawUp™</h1>
                <p class="tagline">RKS, Advocate & Associates</p>
              </div>
              
              <div class="body">
                <h2>Booking Confirmed! ✓</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for scheduling a consultation with LawUp™. Your booking request has been successfully received. Our team will contact you within 24-48 hours to confirm the details.</p>
                
                <div class="details-box">
                  <div class="detail-row"><span class="detail-label">Booking Reference:</span> ${bookingId.slice(0, 8).toUpperCase()}</div>
                  <div class="detail-row"><span class="detail-label">Case Type:</span> ${caseType}</div>
                  <div class="detail-row"><span class="detail-label">Contact Number:</span> ${phone}</div>
                  <div class="detail-row"><span class="detail-label">Email:</span> ${email}</div>
                </div>
                
                <p>What's next? Our legal experts will review your case details and reach out to schedule your consultation at your convenience.</p>
                
                <div style="text-align: center;">
                  <a href="https://cal.id/lawup" class="cta-button">Schedule Meeting Directly</a>
                </div>
              </div>
              
              <div class="footer">
                <p class="footer-title">RKS, Advocate & Associates</p>
                <span class="badge">LawUp™</span>
                <p class="footer-address">
                  P. No- 43, 1st Floor, Shiv Kunj<br>
                  Opp. Bagdi Hospital, Joshi Marg Kalwar<br>
                  Jhotwara, Jaipur, Rajasthan 302012
                </p>
                <p class="footer-copy">
                  © ${new Date().getFullYear()} LawUp™. All rights reserved.<br>
                  Email: iam@rks.ad | Web: lawup.in
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      }),
      // Notification email to admin
      resend.emails.send({
        from: "LawUp System <noreply@mails.rks.ad>",
        to: "iam@rks.ad",
        subject: `[RKS] New Booking: ${caseType} - ${name}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: #c9a54d; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .detail-row { margin: 10px 0; padding: 10px; background: #f9f9f9; border-left: 3px solid #c9a54d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Booking Received</h2>
            </div>
            <div class="content">
              <div class="detail-row"><strong>Booking ID:</strong> ${bookingId}</div>
              <div class="detail-row"><strong>Name:</strong> ${name}</div>
              <div class="detail-row"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></div>
              <div class="detail-row"><strong>Phone:</strong> ${phone}</div>
              <div class="detail-row"><strong>Case Type:</strong> ${caseType}</div>
              <div class="detail-row"><strong>Message:</strong> ${message || "No message"}</div>
              <div class="detail-row"><strong>Received:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
            </div>
          </div>
        </body>
        </html>
      `,
      }),
    ]).catch((error) => {
      console.error("[v0] Background booking email error:", error)
    })

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Booking created successfully",
    })
  } catch (error) {
    console.error("[v0] Booking creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create booking",
      },
      { status: 500 }
    )
  }
}

// Get all bookings (admin)
export async function GET() {
  try {
    const { executeQuery } = await import("@/lib/oracle")
    const bookings = await executeQuery(
      `SELECT * FROM bookings ORDER BY created_at DESC`
    )
    return NextResponse.json({ success: true, bookings })
  } catch (error) {
    console.error("[v0] Error fetching bookings:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
