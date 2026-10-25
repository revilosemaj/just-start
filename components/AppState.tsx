"use client";

import { createContext, useContext, useMemo, useState } from "react";

type AppState = { ready: boolean; setReady: (v: boolean) => void };

const Ctx = createContext<AppState>({ ready: false, setReady: () => {} });

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAppState = () => useContext(Ctx);
