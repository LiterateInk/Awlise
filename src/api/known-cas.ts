import type { CAS } from "~/models";

export const KnownCAS = {
  RhoneAlpes: {
    id: "rhonealpes",
    name: "Auvergne-Rhône-Alpes"
  } satisfies CAS
} as const;

export type KnownCAS = typeof KnownCAS[keyof typeof KnownCAS];
