declare global {
  interface Window {
    // Undefined until the external inline script has loaded — and forever if
    // it is blocked.
    PaystackPop?: {
      setup: (options: PaystackOptions) => { openIframe: () => void };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  onClose?: () => void;
  callback?: (response: { reference: string }) => void;
}

export type PaystackLaunchResult =
  | { ok: true }
  | { ok: false; reason: "missing-key" | "script-unavailable" | "setup-failed"; message: string };

/**
 * Opens the Paystack inline checkout.
 *
 * Returns a result rather than throwing so the caller can restore its own UI
 * state — `onSuccess`/`onClose` never fire when the modal fails to launch.
 */
export function openPaystackCheckout(options: {
  email: string;
  amountGHS: number;
  phone?: string;
  firstName?: string;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
}): PaystackLaunchResult {
  const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!key) {
    console.error("NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set");
    return {
      ok: false,
      reason: "missing-key",
      message: "Payment is not configured yet. Please try again later.",
    };
  }

  // The inline script is loaded from js.paystack.co; ad blockers, offline
  // devices and CSP failures all leave PaystackPop undefined.
  if (typeof window === "undefined" || typeof window.PaystackPop?.setup !== "function") {
    console.error("Paystack inline script is unavailable");
    return {
      ok: false,
      reason: "script-unavailable",
      message: "Could not reach the payment provider. Check your connection and try again.",
    };
  }

  try {
    const handler = window.PaystackPop.setup({
      key,
      email: options.email,
      amount: Math.round(options.amountGHS * 100),
      currency: "GHS",
      ref: "YNZ-" + Date.now(),
      firstname: options.firstName,
      phone: options.phone,
      callback: (response) => {
        options.onSuccess(response.reference);
      },
      onClose: options.onClose,
    });

    handler.openIframe();
    return { ok: true };
  } catch (err) {
    console.error("Paystack setup failed", err);
    return {
      ok: false,
      reason: "setup-failed",
      message: "Could not start the payment. Please try again.",
    };
  }
}
