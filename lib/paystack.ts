declare global {
  interface Window {
    PaystackPop: {
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

export function openPaystackCheckout(options: {
  email: string;
  amountGHS: number;
  phone?: string;
  firstName?: string;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
}) {
  const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!key) {
    console.error("NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set");
    return;
  }

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
}
