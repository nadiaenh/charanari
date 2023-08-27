// noinspection TypeScriptValidateTypes

import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {supabase} from "~/server/supabase";
import axios, {type AxiosResponse} from "axios";
import {replicate} from "~/server/replicateai";

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

    // Get all possible gender options in the database
    getAllGenders: publicProcedure.query(({ctx}) => {
        return ctx.prisma.gender.findMany();
    }),

    // Get all possibly age options in the database
    getAllAges: publicProcedure.query(({ctx}) => {
        return ctx.prisma.age.findMany();
    }),

    // Create a new character
    createCharacter: publicProcedure
        .input(
            z.object({
                characterName: z.string(),
                raceName: z.string(),
                genderName: z.string(),
                ageName: z.string(),
            })
        )
        .mutation(({ctx, input}) => {
            return ctx.prisma.character.create({
                data: {
                    characterName: input.characterName,
                    raceName: input.raceName,
                    genderName: input.genderName,
                    ageName: input.ageName
                },
            });
        }),

    // Generate a character image using OpenAI and save it to Supabase storage
    generateImage: publicProcedure
        .input(z.object({
            prompt: z.string(),
        }))
        .mutation(async ({ctx, input}) => {
            const model =
                "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478";

            console.log("Received input:", input);
            const output: string = await replicate.run(model, {input})
                .then((response) => {
                    console.log("replicate.run() response:", response);
                    return (response as unknown as string);
                })
                .catch((error) => {
                    console.log("replicate.run() error:", error);
                    return "";
                });

            // Download image from URL
            const axiosResponse: AxiosResponse<ArrayBuffer> = await axios.get<ArrayBuffer>(output, {responseType: 'arraybuffer'});
            console.log("axios.get(imageURL) response:", axiosResponse);
            const axiosResponseData: ArrayBuffer = axiosResponse.data ?? {};
            const fileBody = Buffer.from(axiosResponseData);
            console.log("Buffer.from(axios.data) response:", fileBody);

            // Upload image to Supabase storage
            const path = `${output}`;
            const {data, error} = await supabase
                .storage
                .from('avatars')
                .upload(path, fileBody, {
                    cacheControl: '3600',
                    upsert: true
                });
            console.log("supabase.upload() response:", data, error);

            return output;
        }),
});
