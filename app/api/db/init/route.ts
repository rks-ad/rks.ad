import { NextResponse } from "next/server"
import { initializeDatabase, executeQuery } from "@/lib/oracle"

export const runtime = 'edge'

export async function GET() {
  try {
    // Initialize database tables
    await initializeDatabase()

    // Test connection by querying dual
    const result = await executeQuery<{ DUMMY: string }>(
      "SELECT 'connected' as status FROM DUAL"
    )

    return NextResponse.json({
      success: true,
      message: "Oracle database connected and tables initialized",
      status: result[0],
    })
  } catch (error) {
    console.error("[v0] Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Database connection failed",
      },
      { status: 500 }
    )
  }
}
