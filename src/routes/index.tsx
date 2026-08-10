import { createFileRoute } from "@tanstack/react-router";
import EarnTasks from "@/pages/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PromoPulse — Earn Points for Social Tasks" },
      {
        name: "description",
        content:
          "Complete social media tasks to earn points, or spend points to promote your brand on the PromoPulse P2P marketplace.",
      },
      { property: "og:title", content: "PromoPulse — Earn Points for Social Tasks" },
      {
        property: "og:description",
        content: "P2P social promotion marketplace — earn points by completing tasks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EarnTasks,
});
