import { createFileRoute } from "@tanstack/react-router";
import Leads from "@/pages/leads";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads — PromoPulse" },
      { name: "description", content: "Review incoming submissions and approve or reject leads." },
      { property: "og:title", content: "Leads — PromoPulse" },
      { property: "og:description", content: "Review incoming submissions from promoters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Leads,
});
