"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";

/**
 * The store persists to localStorage with `skipHydration: true` so the SSR
 * render matches the client's first render. This component rehydrates the
 * persisted state right after mount.
 */
export default function StoreHydrate() {
  useEffect(() => {
    try {
      (useApp as any).persist?.rehydrate();
    } catch {
      // ignore storage errors
    }
    // Pull marketplace + user data from Supabase once (cached reads, demo fallback).
    // After hydration, auto-enter a referral code from the ?ref= URL parameter
    // (friend2 clicks friend1's link → code is entered automatically, then the
    // URL is cleaned so it can never be re-triggered).
    try {
      void useApp.getState().hydrateFromSupabase().then(() => {
        const s = useApp.getState();
        if (!s.referralCodeEntered && typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const ref = params.get("ref");
          if (ref?.trim()) {
            s.enterReferralCode(ref.trim()).then(() => {
              // Clean the URL so the referral can never be re-triggered.
              try {
                const url = new URL(window.location.href);
                url.searchParams.delete("ref");
                window.history.replaceState(null, "", url.pathname + url.search + window.location.hash);
              } catch { /* ignore */ }
            }).catch(() => {});
          }
        }
      });
    } catch {
      // offline / demo
    }
  }, []);
  return null;
}
