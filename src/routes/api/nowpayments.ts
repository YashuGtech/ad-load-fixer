import { createFileRoute } from "@tanstack/react-router";

/**
 * NOWPayments gateway (server-side, holds the API key).
 * POST  /api/nowpayments              -> create a USDT payment
 * GET   /api/nowpayments?trackId=<id> -> payment status
 */

const API = "https://api.nowpayments.io/v1";

/** App network id -> NOWPayments USDT currency ticker. */
const CURRENCY: Record<string, string> = {
  bsc: "usdtbsc",
  polygon: "usdtmatic",
  optimism: "usdtop",
  ethereum: "usdterc20",
  arbitrum: "usdtarb",
  base: "usdtbase",
  avalanche: "usdtarc20",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function np(path: string, key: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "x-api-key": key,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }
  return { ok: res.ok, status: res.status, data };
}

export const Route = createFileRoute("/api/nowpayments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["NOWPAYMENTS_API_KEY"];
        if (!key) return json({ ok: false, error: "Payment gateway is not configured yet (missing API key)." }, 200);

        let body: any = null;
        try {
          body = await request.json();
        } catch {
          return json({ ok: false, error: "Invalid request" }, 400);
        }

        const amount = Number(body?.amount);
        if (!Number.isFinite(amount) || amount <= 0) return json({ ok: false, error: "Invalid amount" }, 400);

        const network = String(body?.network ?? "bsc");
        const payCurrency = CURRENCY[network] ?? "usdtbsc";
        const orderId = String(body?.orderId ?? `PP-${Date.now()}`);
        const description = String(body?.description ?? "PromoPulse payment");

        // 1) Hosted invoice (gives the secure payment page URL).
        const inv = await np("/invoice", key, {
          method: "POST",
          body: JSON.stringify({
            price_amount: amount,
            price_currency: "usd",
            pay_currency: payCurrency,
            order_id: orderId,
            order_description: description,
          }),
        });

        // 2) Payment attached to the invoice: gives a payment_id we can poll
        //    with the API key, plus the deposit address.
        let pay: any = null;
        if (inv.ok && inv.data?.id) {
          const p = await np("/invoice-payment", key, {
            method: "POST",
            body: JSON.stringify({
              iid: inv.data.id,
              pay_currency: payCurrency,
              order_description: description,
            }),
          });
          if (p.ok && p.data?.payment_id) pay = p.data;
        }

        // Fallback: direct payment (no hosted page).
        if (!pay) {
          const p = await np("/payment", key, {
            method: "POST",
            body: JSON.stringify({
              price_amount: amount,
              price_currency: "usd",
              pay_currency: payCurrency,
              order_id: orderId,
              order_description: description,
            }),
          });
          if (!p.ok || !p.data?.payment_id) {
            const msg = p.data?.message || inv.data?.message || "Payment provider rejected the request";
            return json({ ok: false, error: String(msg) }, 200);
          }
          pay = p.data;
        }

        return json({
          ok: true,
          trackId: String(pay.payment_id),
          paymentUrl: inv.data?.invoice_url ?? "",
          payAddress: pay.pay_address,
          payAmount: pay.pay_amount,
          payCurrency: pay.pay_currency,
          payNetwork: network,
          status: pay.payment_status ?? "waiting",
        });
      },

      GET: async ({ request }) => {
        const key = process.env["NOWPAYMENTS_API_KEY"];
        if (!key) return json({ ok: false, error: "Payment gateway is not configured yet (missing API key)." }, 200);

        const trackId = new URL(request.url).searchParams.get("trackId");
        if (!trackId) return json({ ok: false, error: "Missing trackId" }, 400);

        const r = await np(`/payment/${encodeURIComponent(trackId)}`, key);
        if (!r.ok || !r.data?.payment_status) {
          return json({ ok: false, error: String(r.data?.message || "Could not read payment status") }, 200);
        }
        const s = String(r.data.payment_status);
        // Normalise NOWPayments statuses to the app's vocabulary.
        const status = s === "finished" || s === "confirmed" ? "paid" : s === "partially_paid" ? "manual_accept" : s;
        return json({ ok: true, status, raw: s, payAddress: r.data.pay_address, payAmount: r.data.pay_amount });
      },
    },
  },
});
