import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Temporary in-memory cache for Serverless/Edge to hold OTP codes
const otpCache = new Map<string, { otp: string; expires: number }>()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, otp, name, message } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const cleanEmail = email.toLowerCase().trim()

    // ACTION 1: GENERATE AND SEND OTP
    if (action === 'request-otp') {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
      const expires = Date.now() + 10 * 60 * 1000 // 10 Min Expiry
      otpCache.set(cleanEmail, { otp: generatedOtp, expires })

      // Send the branded OTP layout using your verified subdomain
      await resend.emails.send({
        from: 'RKS AD Verification <no-reply@mails.rks.ad>',
        to: cleanEmail,
        subject: 'Your Verification Code - RKS AD',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
            <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; border: 1px solid #e1e1e1; overflow: hidden;">
              <div style="background-color: #0f172a; padding: 30px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">RKS AD</h1>
              </div>
              <div style="padding: 40px 30px; color: #333333; line-height: 1.6;">
                <h2 style="margin-top: 0; color: #0f172a;">Verification Code</h2>
                <p style="font-size: 16px;">Please use the following One-Time Password (OTP) to verify your email address and lock in your submission inquiry:</p>
                <div style="margin: 30px 0; text-align: center;">
                  <span style="display: inline-block; background-color: #f1f5f9; color: #0f172a; font-size: 32px; font-weight: 700; letter-spacing: 6px; padding: 15px 30px; border-radius: 6px; border: 1px solid #cbd5e1;">${generatedOtp}</span>
                </div>
                <p style="font-size: 14px; color: #64748b;">This code is valid for 10 minutes. If you did not trigger this request, you can safely disregard this message.</p>
              </div>
              <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                © 2026 RKS AD. All rights reserved.
              </div>
            </div>
          </body>
          </html>
        `
      })

      return NextResponse.json({ success: true, message: 'OTP sent successfully' })
    }

    // ACTION 2: VERIFY OTP AND COMPLETE SUBMISSION
    if (action === 'submit-form') {
      if (!otp || !name || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }

      const cachedRecord = otpCache.get(cleanEmail)

      if (!cachedRecord) {
        return NextResponse.json({ error: 'No verification session found for this email' }, { status: 400 })
      }

      if (Date.now() > cachedRecord.expires) {
        otpCache.delete(cleanEmail)
        return NextResponse.json({ error: 'Verification code expired. Please request a new code.' }, { status: 400 })
      }

      if (cachedRecord.otp !== otp.trim()) {
        return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
      }

      // Valid match! Clear from memory
      otpCache.delete(cleanEmail)

      // Send automated branded confirmation to the client
      await resend.emails.send({
        from: 'RKS AD Legal Team <intake@mails.rks.ad>',
        to: cleanEmail,
        subject: 'We Received Your Inquiry - RKS AD',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
            <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; border: 1px solid #e1e1e1; overflow: hidden;">
              <div style="background-color: #0f172a; padding: 30px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 1px;">RKS AD</h1>
              </div>
              <div style="padding: 40px 30px; color: #333333; line-height: 1.6;">
                <h2 style="margin-top: 0; color: #0f172a;">Inquiry Confirmation</h2>
                <p style="font-size: 16px;">Hello ${name},</p>
                <p style="font-size: 16px;">We have successfully received your legal inquiry. Our internal support division is reviewing the brief provided, and an expert associate will connect with you shortly.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                <p style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Best regards,</p>
                <p style="font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 0;">The RKS AD Corporate Intake Team</p>
              </div>
              <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                This is an automated confirmation. Please do not reply directly to this mail grid.
              </div>
            </div>
          </body>
          </html>
        `
      })

      // Send lead detail alert directly to your inbox
      await resend.emails.send({
        from: 'Lead Alerts <system@mails.rks.ad>',
        to: 'iam@rks.ad',
        subject: `New Corporate Lead: ${name}`,
        text: `New intake form received.\n\nName: ${name}\nEmail: ${cleanEmail}\n\nMessage:\n${message}`
      })

      return NextResponse.json({ success: true, message: 'Inquiry processed successfully!' })
    }

    return NextResponse.json({ error: 'Invalid operation action' }, { status: 400 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server Routing Error' }, { status: 500 })
  }
}
