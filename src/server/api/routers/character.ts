import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
    // Get a character by characterId
    getCharacterById: publicProcedure
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

    // Get all characters that exist in the database
    getAllCharacters: publicProcedure.query(({ctx}) => {
        return ctx.prisma.character.findMany();
    }),

    // Get all possible race options in the database
    getAllRaces: publicProcedure.query(({ctx}) => {
        return ctx.prisma.race.findMany();
    }),

    // Create a new character
    createCharacter: publicProcedure
        .mutation(({ctx, input}) => {
            return ctx.prisma.character.create({
                data: {
                    name: input.name,
                    raceName: input.raceName,
                },
            });
        }),
});
