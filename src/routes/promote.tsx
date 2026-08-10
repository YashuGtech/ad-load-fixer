import { createFileRoute } from "@tanstack/react-router";
import Promote from "@/pages/promote";

export const Route = createFileRoute("/promote")({
  head: () => ({
    meta: [
      { title: "Promote — PromoPulse" },
      { name: "description", content: "Create a promotion task and reach real people across social platforms." },
      { property: "og:title", content: "Promote — PromoPulse" },
      { property: "og:description", content: "Create a promotion task and reach real people." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Promote,
});
