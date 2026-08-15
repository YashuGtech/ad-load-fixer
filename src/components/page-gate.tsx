import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/lib/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { showMonetagRewarded } from "@/lib/monetag";

/** Routes that cost 1 page credit per open. The Earn page (/) and the admin
 *  panel stay free. New users get 4 free credits; after that a rewarded
 *  interstitial is shown automatically and the page opens either way.
 *  Premium users never see ads and are never gated. */
const GATED = ["/promote", "/campaigns", "/leads", "/profile", "/users"];

export default function PageGate({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const gated = GATED.some((p) => path === p || path.startsWith(`${p}/`));
  const isPremium = useApp((s) => s.isPremium);
  const spendPageCredit = useApp((s) => s.spendPageCredit);
  const [unlocked, setUnlocked] = useState(false);
  const lastPath = useRef(path);
  const handledPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current !== path) {
      lastPath.current = path;
      handledPath.current = null;
      setUnlocked(false);
    }
    if (!gated || isPremium) return;
    if (handledPath.current === path) return;
    handledPath.current = path;

    // Free credit available → spend it silently and open the page.
    if (spendPageCredit()) {
      setUnlocked(true);
      return;
    }

    // Out of credits → automatically play a rewarded interstitial, then open
    // the page regardless of whether the ad completed (never block the user).
    let alive = true;
    void showMonetagRewarded()
      .catch(() => false)
      .then(() => {
        if (alive) setUnlocked(true);
      });
    return () => {
      alive = false;
    };
  }, [path, gated, isPremium, spendPageCredit]);

  if (!gated || isPremium || unlocked) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <Loader2 className="w-7 h-7 animate-spin text-brand-cyan" />
      <p className="mt-4 text-sm text-gray-400">Loading…</p>
    </motion.div>
  );
}
