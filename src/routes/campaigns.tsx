import { createFileRoute } from "@tanstack/react-router";
import Campaigns from "@/pages/campaigns";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "My Campaigns — PromoPulse" },
      { name: "description", content: "Track your promotion campaigns, submissions and rewards." },
      { property: "og:title", content: "My Campaigns — PromoPulse" },
      { property: "og:description", content: "Track your promotion campaigns and submissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Campaigns,
});
