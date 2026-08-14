/**
 * Ambient types for @paystack/inline-js 2.24.0, which ships no declarations of
 * its own. Covers only the InlineJS v2 surface this app uses — see the package
 * README for the full option list.
 */
declare module "@paystack/inline-js" {
  export interface PaystackTransaction {
    id: number;
    reference: string;
    message: string;
  }

  export interface PaystackLoadEvent {
    id: number;
    customer: Record<string, unknown>;
    accessCode: string;
  }

  export interface PaystackError {
    message: string;
  }

  export interface NewTransactionOptions {
    key: string;
    /** Amount in the currency's minor unit (pesewas for GHS). */
    amount: number;
    email: string;
    currency?: string;
    /** Alphanumeric plus `-`, `.` and `=` only. */
    reference?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    channels?: string[];
    metadata?: Record<string, unknown>;
    onSuccess?: (transaction: PaystackTransaction) => void;
    onLoad?: (event: PaystackLoadEvent) => void;
    onCancel?: () => void;
    onError?: (error: PaystackError) => void;
  }

  export default class PaystackPop {
    newTransaction(options: NewTransactionOptions): { cancel: () => void };
    resumeTransaction(
      accessCode: string,
      callbacks?: Omit<NewTransactionOptions, "key" | "amount" | "email">,
    ): { cancel: () => void };
  }
}
