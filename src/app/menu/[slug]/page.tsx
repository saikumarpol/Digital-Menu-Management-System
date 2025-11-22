// src/app/menu/[slug]/page.tsx
import { appRouter } from "~/server/api/trpc/routers/root";
import { createTRPCContext } from "~/server/api/trpc/context";
import PublicMenuClient from "~/components/menu/PublicMenuClient";

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const ctx = await createTRPCContext();
  const caller = appRouter.createCaller(ctx);
  const menu = await caller.publicMenu.getBySlug({ slug });

  return <PublicMenuClient menu={menu} />;
}
