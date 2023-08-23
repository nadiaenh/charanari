import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
    // Get a character by characterId
    get: publicProcedure
        .input(
            z.object({
                characterId: z.string(),
            })
        )
        .query(({ctx, input}) => {
            return ctx.prisma.character.findUnique({
                where: {
                    id: input.characterId,
                },
            });
        }),

    // Get all characters in the database
    getAll: publicProcedure.query(({ctx}) => {
        return ctx.prisma.character.findMany();
    }),

    // Create a new character
    create: publicProcedure
        .mutation(({ctx, input}) => {
            return ctx.prisma.character.create({
                data: {
                    name: input.name,
                    raceName: input.raceName,
                },
            });
        }),
});
