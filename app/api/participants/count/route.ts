import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { participants } from "@/lib/db/schema";

export async function GET() {
  try {
    // Query the database to count participants
    const participantCount = await db.$count(participants);

    // Return the count as JSON
    return NextResponse.json({ count: participantCount });
  } catch (error) {
    console.error("Error fetching participant count:", error);
    return NextResponse.json({ error: "Failed to fetch participant count" }, { status: 500 });
  }
}
