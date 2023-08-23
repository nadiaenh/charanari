import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const raceRouter = createTRPCRouter({
  // Get all races in the table
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.race.findMany();
  }),
});
