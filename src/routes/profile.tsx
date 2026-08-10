import { createFileRoute } from "@tanstack/react-router";
import Profile from "@/pages/profile";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — PromoPulse" },
      { name: "description", content: "Your points balance, tier, referrals and account settings." },
      { property: "og:title", content: "Your Profile — PromoPulse" },
      { property: "og:description", content: "Your points balance, tier and referrals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});
