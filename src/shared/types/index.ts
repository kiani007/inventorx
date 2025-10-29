/* stylelint-disable */
// Generic, reusable types to keep the codebase consistent and strongly typed.

// Represents the state of an async fetch/process
export type AsyncState<T> = {
  data?: T;
  loading: boolean;
  error?: string;
};

// Success/Failure result type to avoid throwing for control flow
export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Basic pagination envelope
export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

// Utility helpers
export type Nullable<T> = T | null;
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: NonNullable<T[P]> };

// Brands (nominal typing) for IDs and similar
export type Brand<T, B extends string> = T & { __brand: B };


