/**
 * Paystack checkout via InlineJS v2 (`@paystack/inline-js`).
 *
 * v2 is imported from npm rather than loaded from js.paystack.co, so there is
 * no external script for an ad blocker or CSP to remove. The import is dynamic
 * to keep the SDK out of the server bundle and off the initial page load — it
 * is only needed once someone reaches the pay button.
 *
 * Every failure mode reaches `onFailure`: a missing key, a chunk that will not
 * load, and — the case v1 could not report at all — a transaction the SDK
 * accepts and then fails to initialise, which arrives via v2's `onError`.
 */
export function openPaystackCheckout(options: {
  email: string;
  amountGHS: number;
  phone?: string;
  firstName?: string;
  onSuccess: (reference: string) => void;
  onCancel?: () => void;
  onFailure?: (message: string) => void;
}): void {
  const fail = (message: string) => options.onFailure?.(message);

  const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!key) {
    console.error("NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set");
    fail("Payment is not configured yet. Please try again later.");
    return;
  }

  void (async () => {
    let PaystackPop: typeof import("@paystack/inline-js").default;
    try {
      PaystackPop = (await import("@paystack/inline-js")).default;
    } catch (err) {
      console.error("Failed to load the Paystack SDK", err);
      fail("Could not load the payment form. Check your connection and try again.");
      return;
    }

    try {
      new PaystackPop().newTransaction({
        key,
        email: options.email,
        // Paystack expects the minor unit — pesewas for GHS.
        amount: Math.round(options.amountGHS * 100),
        currency: "GHS",
        reference: "YNZ-" + Date.now(),
        firstName: options.firstName,
        phone: options.phone,
        onSuccess: (transaction) => options.onSuccess(transaction.reference),
        onCancel: () => options.onCancel?.(),
        onError: (error) => {
          console.error("Paystack transaction error", error);
          fail(error.message || "The payment could not be started. Please try again.");
        },
      });
    } catch (err) {
      console.error("Paystack newTransaction threw", err);
      fail("Could not start the payment. Please try again.");
    }
  })();
}
