"use client";

import { Link as RouterLink, useRouter as useTanstackRouter, useRouterState } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

/**
 * Thin compatibility layer so the app's components can keep using the
 * familiar `usePathname()` / `router.push()` / `<Link href>` API on top of
 * TanStack Router.
 */

export function usePathname(): string {
  return useRouterState({ select: (s) => s.location.pathname });
}

export function useRouter() {
  const router = useTanstackRouter();
  return {
    push: (href: string) => router.navigate({ to: href as never }),
    replace: (href: string) => router.navigate({ to: href as never, replace: true }),
    back: () => router.history.back(),
    refresh: () => router.invalidate(),
  };
}

type LinkProps = Omit<ComponentProps<"a">, "href"> & { href: string; children?: ReactNode };

export default function Link({ href, children, ...rest }: LinkProps) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <RouterLink to={href as never} {...(rest as object)}>
      {children}
    </RouterLink>
  );
}
