// noinspection TypeScriptValidateTypes

import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {supabase} from "~/server/supabase";
import axios from "axios";
import {replicate} from "~/server/replicateai";

const model = "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65";
const BASE_PROMPT = "best quality, illustration, beautiful detailed, colorful, face and torso, sfw, ";
const NEGATIVE_PROMPT = "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, username, blurry, artist name, nudity, nsfw";

async function generateImage(characterPrompts: string): Promise<string | undefined> {
    try {
        const prompt = BASE_PROMPT + characterPrompts;

        const input = {
            input: {
                prompt: prompt,
                negative_prompt: NEGATIVE_PROMPT,
                width: 512,
                height: 512,
            }
        };

        const response = await replicate.run(model, input) as string[];
        return response[0];
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}

async function downloadImage(imageURL: string): Promise<Buffer> {
    try {
        const axiosResponse = await axios.get<ArrayBuffer>(imageURL, {responseType: 'arraybuffer'});
        return Buffer.from(axiosResponse.data ?? {});
    } catch (error) {
        console.error("Error downloading image:", error);
        throw error;
    }
}

async function uploadToStorage(filePath: string, fileBody: Buffer): Promise<void> {
    try {
        await supabase.storage.from('avatars').upload(filePath, fileBody, {
            cacheControl: '3600',
            upsert: true
        });
        console.log("Image uploaded to Supabase storage.");
    } catch (error) {
        console.error("Error uploading image to Supabase storage:", error);
        throw error;
    }
}

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
                prompts: z.string()
            })
        )
        .mutation(async ({ctx, input}) => {
            try {
                console.log("Creating character in the database...");

                const generatedImage = await generateImage(input.prompts) ?? "https://ih1.redbubble.net/image.2579899118.1732/st,small,507x507-pad,600x600,f8f8f8.jpg";
                const fileBody = await downloadImage(generatedImage);
                await uploadToStorage(generatedImage, fileBody);

                const response = await ctx.prisma.character.create({
                    data: {
                        characterName: input.characterName,
                        raceName: input.raceName,
                        genderName: input.genderName,
                        ageName: input.ageName,
                        avatarPath: generatedImage
                    },
                });

                return response.id;
            } catch (error) {
                console.error("Error creating character:", error);
                throw error;
            }
        }),
});