// noinspection TypeScriptValidateTypes

import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {ImagesResponse} from "openai/resources";

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
        .input(
            z.object({
                characterName: z.string(),
                raceName: z.string(),
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.character.create({
                data: {
                    characterName: input.characterName,
                    raceName: input.raceName,
                },
            });
        }),

    // Generate a character image using OpenAI
    generateImage: publicProcedure
        .input(z.object({
            prompt: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            console.log("Received input:", input);

            const response: ImagesResponse = await ctx.openai.images.generate({prompt: input.prompt});
            console.log("generateImage response:", response);

            return response?.data[0]?.url ?? "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzJld2x3cmo5MnZuZzQ5am94bjIxbGVwNDRmc3drOXFtM3g3dXJvYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/95dDwxcwwwQ78XXQIN/giphy.gif";
        })
});
