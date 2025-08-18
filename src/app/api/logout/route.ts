import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Clear any server-side sessions or tokens here if needed
    // For NextAuth, the signOut on client handles the session cleanup

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "LOGOUT_ERROR",
        message: "Failed to logout",
      },
      { status: 500 }
    )
  }
}
