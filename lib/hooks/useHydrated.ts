"use client";

import { useEffect, useState } from "react";

/**
 * Returns false on the server and on the client's first render, then true.
 *
 * Zustand's `persist` middleware rehydrates from localStorage synchronously
 * while the store module is evaluated, so `persist.hasHydrated()` is already
 * true by the time the first client render runs. Gating persisted state on it
 * therefore does nothing — the client renders the restored value against
 * server HTML built from the empty initial state, and React reports a
 * hydration mismatch. Waiting for an effect is what actually guarantees the
 * first client render matches the server.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
