import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  getCharacters: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.character.findMany();
  }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.character.findMany();
  // }),
});
