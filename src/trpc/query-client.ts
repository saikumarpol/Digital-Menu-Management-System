// src/trpc/query-client.ts
import { QueryClient } from "@tanstack/react-query";

let client: QueryClient | null = null;

/**
 * Ensures a single QueryClient instance during RSC hydration.
 */
export function getQueryClient() {
  client ??= new QueryClient();
  return client;
}
