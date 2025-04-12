import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON data from Zapier/Slack
    const data = await request.json()

    // Extract the fields we need
    const { name, email, username, phone } = data

    // Validate required fields
    if (!name || !email || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new participant record in the database
    const participant = await db.participant.create({
      data: {
        name,
        email,
        username,
        phone: phone || null,
        appliedDate: new Date(),
      },
    })

    // Return the created participant
    return NextResponse.json(participant, { status: 201 })
  } catch (error) {
    console.error("Error processing Slack event:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
