import { NextRequest, NextResponse } from "next/server"
import { executeInsert } from "@/lib/oracle"

function generateId(): string {
  return crypto.randomUUID()
}

export async function POST(request: NextRequest) {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const files = formData.getAll("files") as File[]

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const submissionId = generateId()

    // Insert into Oracle database (non-critical, continue even if fails)
    try {
      await executeInsert(
        `INSERT INTO contact_submissions (id, name, email, phone, subject, message, created_at)
         VALUES (:id, :name, :email, :phone, :subject, :message, CURRENT_TIMESTAMP)`,
        {
          id: submissionId,
          name,
          email,
          phone: phone || "",
          subject: subject || "General Inquiry",
          message,
        }
      )
    } catch (dbError) {
      console.error("[v0] Database insert error (non-critical):", dbError)
      // Email sending will still succeed even if database insert fails
    }

    // Send emails in background without awaiting (fire and forget)
    // This allows the API to return immediately, improving perceived performance
    Promise.all([
      // Notification email to admin
      resend.emails.send({
        from: "LawUp Contact <noreply@mails.rks.ad>",
        to: "iam@rks.ad",
        subject: `[RKS] Contact Form: ${subject || "General Inquiry"} - ${name}`,
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
              .badge { display: inline-block; background: #c9a54d; color: #1a1a2e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="detail-row"><strong>Submission ID:</strong> ${submissionId}</div>
                <div class="detail-row"><strong>Name:</strong> ${name}</div>
                <div class="detail-row"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></div>
                <div class="detail-row"><strong>Phone:</strong> ${phone || "Not provided"}</div>
                <div class="detail-row"><strong>Subject:</strong> ${subject || "General Inquiry"}</div>
                <div class="detail-row"><strong>Message:</strong> <pre>${message}</pre></div>
                ${files.length > 0 ? `<div class="detail-row"><strong>Attachments:</strong> ${files.length} file(s)</div>` : ""}
                <div class="detail-row"><strong>Received:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
                <div style="text-align: center; margin-top: 20px;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your Inquiry")}" style="background: #c9a54d; color: #1a1a2e; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reply to ${name}</a>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
      // Confirmation email to user
      resend.emails.send({
        from: "LawUp™ <noreply@mails.rks.ad>",
        to: email,
        subject: "We've Received Your Message - LawUp™ | RKS, Advocate",
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
              .reference-box { background-color: #f8f5f0; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; text-align: center; margin: 24px 0; }
              .ref-label { color: #999999; font-size: 12px; margin-bottom: 4px; }
              .ref-code { color: #1a1a2e; font-size: 18px; font-weight: bold; font-family: monospace; }
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
                  <h2>Thank You for Reaching Out!</h2>
                  <p>Dear <strong>${name}</strong>,</p>
                  <p>We have received your message and appreciate you contacting LawUp™. Our legal team will review your inquiry and get back to you within 24-48 hours.</p>
                  
                  <p>For urgent legal matters, we recommend scheduling a consultation directly:</p>
                  
                  <div style="text-align: center;">
                    <a href="https://cal.id/lawup" style="display: inline-block; background-color: #c9a54d; color: #1a1a2e; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0;">Book Your Consultation Now</a>
                  </div>
                  
                  <div class="reference-box">
                    <p class="ref-label">Your Reference Number:</p>
                    <p class="ref-code">${submissionId.slice(0, 8).toUpperCase()}</p>
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
    ]).catch((error) => {
      console.error("[v0] Background email send error:", error)
      // Silently fail - form was already submitted successfully
    })

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit form",
      },
      { status: 500 }
    )
  }
}
