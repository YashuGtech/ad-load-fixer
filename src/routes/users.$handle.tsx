import { createFileRoute } from "@tanstack/react-router";
import UserPage from "@/pages/user-profile";

export const Route = createFileRoute("/users/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.handle} — PromoPulse` },
      { name: "description", content: `Profile, submissions and campaigns for @${params.handle} on PromoPulse.` },
      { property: "og:title", content: `@${params.handle} — PromoPulse` },
      { property: "og:description", content: `Profile and activity for @${params.handle}.` },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UserRoute,
});

function UserRoute() {
  const { handle } = Route.useParams();
  return <UserPage handle={handle} />;
}
