import type Lenis from "lenis";

/** Shared handle to the Lenis instance so components can stop/start/scrollTo. */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Duration for a programmatic scroll, scaled by distance so long jumps don't fly. */
export const scrollDuration = (distancePx: number) =>
  Math.min(3.2, Math.max(1.2, Math.abs(distancePx) / 1800));
