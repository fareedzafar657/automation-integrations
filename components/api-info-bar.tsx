"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Copy, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export function ApiInfoBar() {
  const [isOpen, setIsOpen] = useState(false)

  const apiUrl = "https://automation-integrations.vercel.app/api/slack-event"
  const zapierTemplateUrl = "https://zapier.com/shared/59d3035e1a1d41a7d9dc18d61c163137cadd7daf"

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: message,
      duration: 3000,
    })
  }

  return (
    <div className="bg-slate-900 text-white w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="container mx-auto py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">
              API Endpoint: <code className="bg-slate-800 px-2 py-1 rounded">{apiUrl}</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={zapierTemplateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 hover:underline"
            >
              <span>Zapier Template</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-6 text-white">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">Toggle API info</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="mt-2 space-y-3 text-sm">
          <div className="bg-slate-800 rounded-md p-3">
            <h3 className="font-medium mb-2">API Details:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-1 flex items-center gap-2">
                  <Badge variant="secondary">POST</Badge>
                  <span>Request Type</span>
                </p>
                <p className="mb-1">
                  Content-Type: <code>application/json</code>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => copyToClipboard(apiUrl, "API URL copied to clipboard")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy URL
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Required Fields:</h4>
                <ul className="list-disc list-inside space-y-1 ml-1">
                  <li>
                    <code>name</code>: Participant's name (string)
                  </li>
                  <li>
                    <code>email</code>: Email address (string)
                  </li>
                  <li>
                    <code>username</code>: Username (string)
                  </li>
                </ul>
                <h4 className="font-medium mb-1 mt-2">Optional Fields:</h4>
                <ul className="list-disc list-inside ml-1">
                  <li>
                    <code>phone</code>: Phone number (string)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-md p-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Zapier Integration:</h3>
              <a
                href={zapierTemplateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-[#FF4A00] text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-[#E54400] transition-colors"
              >
                <span>Use Zapier Template</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="mt-2 text-xs">
              Use our pre-configured Zapier template to quickly set up the integration between Slack and this
              application. The template includes all the necessary field mappings and configuration.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
