import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      )
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Store OTP in encrypted cookie (expires in 10 minutes)
    const otpData = {
      otp,
      email,
      expires: Date.now() + 10 * 60 * 1000,
    }
    
    const cookieStore = await cookies()
    cookieStore.set("otp_data", Buffer.from(JSON.stringify(otpData)).toString("base64"), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 600, // 10 minutes
    })

    // Send email in background without awaiting (fire and forget)
    resend.emails.send({
      from: "LawUp™ <noreply@mails.rks.ad>",
      to: email,
      subject: "Email Verification - LawUp™ Consultation",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #f8f5f0; }
            table { border-collapse: collapse; }
            .container { background-color: #f8f5f0; padding: 40px 20px; }
            .email-wrapper { background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 32px; text-align: center; }
            .logo-text { color: #c9a54d; font-size: 28px; font-weight: bold; margin: 0; }
            .tagline { color: #ffffff; font-size: 14px; margin: 8px 0 0; }
            .body { padding: 40px 32px; }
            .body h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 16px; }
            .body p { color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
            .otp-box { background-color: #f8f5f0; border: 2px dashed #c9a54d; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; }
            .otp-label { color: #666666; font-size: 14px; margin-bottom: 8px; }
            .otp-code { color: #1a1a2e; font-size: 40px; letter-spacing: 8px; font-weight: bold; margin: 0; font-family: monospace; }
            .warning { color: #999999; font-size: 14px; margin-top: 24px; }
            .footer { background-color: #f8f5f0; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0; }
            .footer-title { color: #666666; font-size: 14px; font-weight: bold; margin-bottom: 8px; }
            .footer-address { color: #999999; font-size: 12px; margin: 8px 0; }
            .footer-copy { color: #999999; font-size: 12px; margin-top: 16px; }
            .badge { display: inline-block; background-color: #c9a54d; color: #1a1a2e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <!-- Header -->
              <div class="header">
                <h1 class="logo-text">LawUp™</h1>
                <p class="tagline">RKS, Advocate & Associates</p>
              </div>
              
              <!-- Body -->
              <div class="body">
                <h2>Verify Your Email Address</h2>
                <p>Thank you for choosing LawUp™ for your legal consultation. To proceed with your booking, please verify your email using the code below:</p>
                
                <!-- OTP Box -->
                <div class="otp-box">
                  <p class="otp-label">Your Verification Code</p>
                  <h1 class="otp-code">${otp}</h1>
                </div>
                
                <p class="warning">
                  ⏱️ This code will expire in <strong>10 minutes</strong>. Please enter this code on the booking form to continue. If you did not request this verification, please ignore this email.
                </p>
              </div>
              
              <!-- Footer -->
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
    }).catch((error) => {
      console.error("[v0] Background OTP send error:", error)
    })

    // Return success immediately without waiting for email
    return NextResponse.json({ success: true, message: "OTP sent successfully" })
  } catch (error) {
    console.error("[v0] Send OTP error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}
