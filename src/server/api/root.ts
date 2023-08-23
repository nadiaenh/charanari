import { characterRouter } from "~/server/api/routers/character";
import { createTRPCRouter } from "~/server/api/trpc";
import { raceRouter } from "./routers/race";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  character: characterRouter,
  race: raceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
