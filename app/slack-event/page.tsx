import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SlackEventPage() {
  // Fetch participants from the API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/participants`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Fetch failed: ${response.status} ${response.statusText} - ${errorText}`);
    throw new Error("Failed to fetch participants.");
  }

  const participants = await response.json();

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Slack Event Participants</h1>

      {participants.length === 0 ? (
        <p className="text-muted-foreground">No participants have registered yet.</p>
      ) : (
        <div className="grid gap-6">
          {participants.map((participant: any) => (
            <Card key={participant.id}>
              <CardHeader>
                <CardTitle>{participant.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">{participant.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{participant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{participant.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Applied Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(participant.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
