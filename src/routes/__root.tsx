import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import Sidebar from "@/components/sidebar";
import TopHeader from "@/components/top-header";
import ToastStack from "@/components/toast-stack";
import MobileNav from "@/components/mobile-nav";
import StoreHydrate from "@/components/store-hydrate";
import SecurityGuard from "@/components/security-guard";
import AdminRedirect from "@/components/admin-redirect";
import MonetagAdManager from "@/components/monetag-ad-manager";
import PageGate from "@/components/page-gate";
import AccountGate from "@/components/account-gate";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Page not found</h2>
        <p className="mt-2 text-sm text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary inline-flex">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">This page didn&apos;t load</h1>
        <p className="mt-2 text-sm text-gray-400">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { title: "PromoPulse — P2P Social Promotion" },
      {
        name: "description",
        content:
          "P2P social promotion marketplace. Earn points by completing social tasks, or spend points to promote your brand.",
      },
      { property: "og:title", content: "PromoPulse — P2P Social Promotion" },
      { property: "og:description", content: "Earn points by completing social tasks, or promote your brand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [{ src: "https://telegram.org/js/telegram-web-app.js" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen relative overflow-x-hidden font-sans">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AccountGate>
      {/* Decorative twinkles */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="twinkle" style={{ top: "12%", left: "8%" }} />
        <div className="twinkle" style={{ top: "22%", left: "32%", animationDelay: "0.6s" }} />
        <div className="twinkle" style={{ top: "55%", left: "62%", animationDelay: "1.2s" }} />
        <div className="twinkle" style={{ top: "68%", left: "14%", animationDelay: "1.8s" }} />
        <div className="twinkle" style={{ top: "84%", left: "78%", animationDelay: "2.4s" }} />
        <div className="twinkle" style={{ top: "30%", left: "88%", animationDelay: "0.2s" }} />
        <div className="twinkle" style={{ top: "76%", left: "44%", animationDelay: "1.5s" }} />
      </div>

      <Sidebar />
      <div className="relative z-10 lg:ml-[244px] pb-24 lg:pb-0 min-h-screen">
        <TopHeader />
        <main className="px-4 lg:px-8 py-6 lg:py-8">
          {/* Page-credit paywall: gated routes cost 1 credit per open, earned by watching rewarded ads. */}
          <PageGate>
            {/* Required: nested routes render here. */}
            <Outlet />
          </PageGate>
        </main>
      </div>
      <MobileNav />
      <ToastStack />
      <SecurityGuard />
      <StoreHydrate />
      <AdminRedirect />
      {/* Monetag: rewarded interstitials only — no auto in-app ads. */}
      <MonetagAdManager />
      </AccountGate>
    </QueryClientProvider>
  );
}
