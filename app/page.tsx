import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"

export default async function Home() {
  // Count the number of participants for the card
  const participantCount = await db.participant.count()

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Event Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Slack Event</CardTitle>
            <CardDescription>View all participants from Slack events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{participantCount} participants registered</p>
          </CardContent>
          <CardFooter>
            <Link href="/slack-event" className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Additional event cards can be added here */}
      </div>
    </main>
  )
}
