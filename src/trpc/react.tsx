"use client";

import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";

import { type AppRouter } from "~/server/api/trpc/routers/root";
import { getQueryClient } from "./query-client";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const trpcClient = api.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
    transformer: superjson,
  });

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  );
}
