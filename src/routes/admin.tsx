import { createFileRoute } from "@tanstack/react-router";
import AdminPage from "@/pages/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — PromoPulse" },
      { name: "description", content: "Moderation and platform administration console." },
      { property: "og:title", content: "Admin — PromoPulse" },
      { property: "og:description", content: "Moderation and platform administration console." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});
