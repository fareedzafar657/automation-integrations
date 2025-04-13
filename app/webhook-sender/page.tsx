import { WebhookFormBuilder } from "@/components/webhook-form-builder";

export default function WebhookSenderPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Webhook Sender</h1>
      <p className="text-muted-foreground mb-8">
        Create a custom form with dynamic fields and send the data to any webhook URL.
      </p>

      <WebhookFormBuilder />
    </main>
  )
}
