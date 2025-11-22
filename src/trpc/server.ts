// src/trpc/server.ts
import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { appRouter } from "~/server/api/trpc/routers/root";
import { createTRPCContext } from "~/server/api/trpc/context";
import { getQueryClient } from "./query-client";

/**
 * Cached context creator for RSC calls
 */
const createContext = cache(() => {
  return createTRPCContext();
});

/**
 * Cached caller for RSC (async factory)
 */
const createCaller = cache(async () => {
  const ctx = await createContext();
  return appRouter.createCaller(ctx);
});

/**
 * NOTE:
 * We avoid calling `createCaller()` at module evaluation time because that
 * will call `createTRPCContext()` which uses `cookies()` and can throw when
 * imported outside a request scope. Instead, provide a function that returns
 * the hydration helpers when invoked during a request.
 */
export async function getServerHydrationHelpers() {
  const caller = await createCaller();
  return createHydrationHelpers<typeof appRouter>(caller, getQueryClient);
}
