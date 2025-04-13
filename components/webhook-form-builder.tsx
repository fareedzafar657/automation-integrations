"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface FormField {
  id: string
  label: string
  value: string
}

export function WebhookFormBuilder() {
  const [fields, setFields] = useState<FormField[]>([{ id: "field-1", label: "Field 1", value: "" }])
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("builder")

  const { toast } = useToast()

  // Add a new field to the form
  const addField = () => {
    const newId = `field-${fields.length + 1}`
    setFields([...fields, { id: newId, label: `Field ${fields.length + 1}`, value: "" }])
  }

  // Remove a field from the form
  const removeField = (id: string) => {
    if (fields.length === 1) {
      toast({
        title: "Cannot remove field",
        description: "You need at least one field in the form.",
        variant: "destructive",
      })
      return
    }
    setFields(fields.filter((field) => field.id !== id))
  }

  // Update a field's label
  const updateFieldLabel = (id: string, label: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, label } : field)))
  }

  // Update a field's value
  const updateFieldValue = (id: string, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  // Submit the form data to the webhook URL
  const submitForm = async () => {
    if (!webhookUrl) {
      toast({
        title: "Webhook URL required",
        description: "Please enter a webhook URL to send the data to.",
        variant: "destructive",
      })
      return
    }

    // Validate URL format
    try {
      new URL(webhookUrl)
    } catch (e) {
      toast({
        title: "Invalid webhook URL",
        description: "Please enter a valid URL including the protocol (http:// or https://).",
        variant: "destructive",
      })
      return
    }

    // Create payload from fields
    const payload: Record<string, string> = {}
    fields.forEach((field) => {
      payload[field.label] = field.value
    })

    const formBody = new URLSearchParams(payload).toString()

    setIsSubmitting(true)

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      })
      if (response.ok) {
        toast({
          title: "Data sent successfully",
          description: "Your form data was sent to the webhook URL.",
        })
      } else {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      toast({
        title: "Failed to send data",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Preview the JSON payload
  const getJsonPreview = () => {
    const payload: Record<string, string> = {}
    fields.forEach((field) => {
      payload[field.label] = field.value || "[empty]"
    })
    return JSON.stringify(payload, null, 2)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Webhook Form</CardTitle>
        <CardDescription>
          Build a custom form and send the data to any webhook URL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="builder">Form Builder</TabsTrigger>
            <TabsTrigger value="preview">JSON Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <div className="space-y-4">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6"
                >
                  <div className="flex-1">
                    <Label htmlFor={`${field.id}-label`}>Label</Label>
                    <Input
                      id={`${field.id}-label`}
                      value={field.label}
                      onChange={(e) =>
                        updateFieldLabel(field.id, e.target.value)
                      }
                      placeholder="Enter field label"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`${field.id}-value`}>Value</Label>
                    <Input
                      id={`${field.id}-value`}
                      value={field.value}
                      onChange={(e) =>
                        updateFieldValue(field.id, e.target.value)
                      }
                      placeholder="Enter field value"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="self-end"
                    onClick={() => removeField(field.id)}
                    title="Remove field"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove field</span>
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" onClick={addField}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Field
            </Button>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL (required)</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://example.com/webhook"
              />
              <p className="text-xs text-muted-foreground">
                Enter the URL where you want to send the form data
              </p>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm whitespace-pre-wrap break-all">
                  {getJsonPreview()}
                </pre>
              </div>

              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  This JSON will be sent to:{" "}
                  <span className="font-mono">
                    {webhookUrl || "[No URL specified]"}
                  </span>
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={submitForm}
          disabled={isSubmitting || !webhookUrl}
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send to Webhook
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
