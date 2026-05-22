import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      )
    }

    // Get OTP data from cookie
    const cookieStore = await cookies()
    const otpDataCookie = cookieStore.get("otp_data")
    
    if (!otpDataCookie) {
      return NextResponse.json(
        { error: "OTP expired or not found. Please request a new one." },
        { status: 400 }
      )
    }

    const otpData = JSON.parse(Buffer.from(otpDataCookie.value, "base64").toString())

    // Verify email matches
    if (otpData.email !== email) {
      return NextResponse.json(
        { error: "Email mismatch. Please request a new OTP." },
        { status: 400 }
      )
    }

    // Check if OTP has expired
    if (Date.now() > otpData.expires) {
      cookieStore.delete("otp_data")
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      )
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      )
    }

    // OTP is valid - clear it
    cookieStore.delete("otp_data")
    
    // Set verified session cookie
    cookieStore.set("email_verified", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    })

    return NextResponse.json({ 
      success: true, 
      message: "Email verified successfully",
      verified: true 
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
