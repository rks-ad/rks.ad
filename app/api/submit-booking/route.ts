import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const booking = await request.json()
    
    const { name, email, phone, caseType, preferredDate, preferredTime, message } = booking

    if (!name || !email || !phone || !caseType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Verify email was verified
    const cookieStore = await cookies()
    const verifiedEmail = cookieStore.get("email_verified")
    
    if (!verifiedEmail || verifiedEmail.value !== email) {
      return NextResponse.json(
        { error: "Email not verified. Please verify your email first." },
        { status: 401 }
      )
    }

    // Generate booking reference
    const bookingRef = `LU${Date.now().toString(36).toUpperCase()}`

    // Send confirmation email to client
    await resend.emails.send({
      from: "LawUp™ <noreply@mails.rks.ad>",
      to: email,
      subject: `Booking Confirmed - ${bookingRef} | LawUp™ | RKS, Advocate`,
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
            .success-banner { background-color: #22c55e; padding: 16px; text-align: center; color: #ffffff; font-weight: bold; }
            .body { padding: 40px 32px; }
            .body h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 16px; }
            .body p { color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 16px; }
            .details-box { background-color: #f8f5f0; border-radius: 12px; padding: 24px; margin: 24px 0; }
            .detail-row { margin: 8px 0; padding: 8px 0; border-bottom: 1px solid #e0e0e0; color: #666666; font-size: 15px; }
            .detail-label { font-weight: bold; color: #1a1a2e; }
            .detail-value { color: #c9a54d; font-weight: bold; }
            .footer { background-color: #f8f5f0; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer-title { color: #666666; font-size: 14px; font-weight: bold; margin-bottom: 8px; }
            .footer-address { color: #999999; font-size: 12px; margin: 8px 0; }
            .footer-copy { color: #999999; font-size: 12px; margin-top: 16px; }
            .badge { display: inline-block; background-color: #c9a54d; color: #1a1a2e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 8px; }
            a { color: #c9a54d; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <h1 class="logo-text">LawUp™</h1>
                <p class="tagline">RKS, Advocate & Associates</p>
              </div>
              
              <div class="success-banner">✓ Booking Confirmed</div>
              
              <div class="body">
                <h2>Thank You, ${name}!</h2>
                <p>Your consultation request has been received. Our team will contact you shortly to confirm your appointment.</p>
                
                <div class="details-box">
                  <div class="detail-row"><span class="detail-label">Reference No.:</span> <span class="detail-value">${bookingRef}</span></div>
                  <div class="detail-row"><span class="detail-label">Case Type:</span> ${caseType}</div>
                  ${preferredDate ? `<div class="detail-row"><span class="detail-label">Preferred Date:</span> ${preferredDate}</div>` : ''}
                  ${preferredTime ? `<div class="detail-row"><span class="detail-label">Preferred Time:</span> ${preferredTime}</div>` : ''}
                  <div class="detail-row"><span class="detail-label">Phone:</span> ${phone}</div>
                </div>
                
                ${message ? `<div class="details-box"><strong>Your Message:</strong><p style="margin: 12px 0 0; font-style: italic;">"${message}"</p></div>` : ''}
                
                <p>If you have any questions, please contact us at <a href="mailto:iam@rks.ad">iam@rks.ad</a></p>
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
                  © ${new Date().getFullYear()} LawUp™. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // Send notification email to lawyer
    resend.emails.send({
      from: "LawUp System <noreply@mails.rks.ad>",
      to: "iam@rks.ad",
      subject: `[RKS] New Consultation Request - ${bookingRef} | ${caseType}`,
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
              <h2 style="margin: 0;">New Consultation Request</h2>
            </div>
            <div class="content">
              <div class="detail-row"><strong>Booking ID:</strong> ${bookingRef}</div>
              <div class="detail-row"><strong>Name:</strong> ${name}</div>
              <div class="detail-row"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></div>
              <div class="detail-row"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></div>
              <div class="detail-row"><strong>Case Type:</strong> ${caseType}</div>
              ${preferredDate ? `<div class="detail-row"><strong>Preferred Date:</strong> ${preferredDate}</div>` : ''}
              ${preferredTime ? `<div class="detail-row"><strong>Preferred Time:</strong> ${preferredTime}</div>` : ''}
              ${message ? `<div class="detail-row"><strong>Message:</strong> ${message}</div>` : ''}
              <div class="detail-row"><strong>Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
            </div>
          </div>
        </body>
        </html>
      `,
    }).catch((error) => {
      console.error("[v0] Background booking confirmation email error:", error)
    })

    // Clear verified email cookie after successful booking
    cookieStore.delete("email_verified")

    return NextResponse.json({ 
      success: true, 
      message: "Booking submitted successfully",
      bookingRef 
    })
  } catch (error) {
    console.error("[v0] Booking submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit booking. Please try again." },
      { status: 500 }
    )
  }
}
