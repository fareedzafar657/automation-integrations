import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { participants } from "@/lib/db/schema";
import { desc } from 'drizzle-orm';


export async function GET() {
  try {
    // Fetch participants from the database, ordered by appliedDate in descending order
    const participantList = await db
      .select()
      .from(participants)
      .orderBy(desc(participants.appliedDate));

    // Return the participants as JSON
    return NextResponse.json(participantList);
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json({ error: "Failed to fetch participants" }, { status: 500 });
  }
}
