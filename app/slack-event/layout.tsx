import React from "react";
import { ApiInfoBar } from "@/components/api-info-bar"

export default function SlackEventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* ApiInfoBar component at the top */}
      <ApiInfoBar />
      <main>{children}</main>
    </div>
  );
}
