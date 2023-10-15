// noinspection TypeScriptValidateTypes

import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {supabase} from "~/server/supabase";
import axios from "axios";
import {replicate} from "~/server/replicateai";

const model = "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65";
const BASE_PROMPT = "masterpiece, illustration, beautiful detailed, intricate details, sfw, face and torso, looking at the camera, ";
const NEGATIVE_PROMPT = "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, username, blurry, artist name, nudity, nsfw";

async function generateImage(prompt: string): Promise<string | undefined> {
    try {
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

async function uploadToStorage(filePath: string, fileBody: Buffer): Promise<string> {
    try {

        // Upload image to Supabase storage
        const {data: uploadResponse, error: uploadError} = await supabase.storage.from('avatars').upload(filePath, fileBody, {
            upsert: true
        });
        console.log("Image uploaded to Supabase storage. Response : ", uploadResponse, " Error :", uploadError);

        const imagePath = uploadResponse?.path ?? "";

        // Get public URL of image
        const {data} = supabase.storage.from('avatars').getPublicUrl(imagePath);
        console.log("Public URL of image: ", data);

        return data.publicUrl ?? "https://ih1.redbubble.net/image.2579899118.1732/st,small,507x507-pad,600x600,f8f8f8.jpg";

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
        .query(async ({ctx, input}) => {
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

    // Get the prompts for a character
    getPrompts: publicProcedure
        .input(
            z.object({
                raceName: z.string(),
                ageName: z.string(),
                genderName: z.string(),
            })
    ).mutation(async ({ctx, input}) => {
        try {
            console.log("Getting prompts for character...");

            const racePrompt = await ctx.prisma.race.findUnique({
                where: {
                    name: input.raceName,
                },
            });
            const agePrompt = await ctx.prisma.age.findUnique({
                where: {
                    name: input.ageName,
                }
            });
            const genderPrompt = await ctx.prisma.gender.findUnique({
                where: {
                    name: input.genderName,
                }
            });

            if (racePrompt && agePrompt && genderPrompt){
                return BASE_PROMPT + racePrompt?.prompt + agePrompt?.prompt + genderPrompt?.prompt;
            }

        } catch (error) {
            console.error("Error getting character prompts:", error);
            throw error;
        }
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
                let filePath = "";
                let avatarPath = "";

                try {
                    const generatedImage = await generateImage(input.prompts) ?? "https://ih1.redbubble.net/image.2579899118.1732/st,small,507x507-pad,600x600,f8f8f8.jpg";
                    const fileBody = await downloadImage(generatedImage);
                    filePath = `${input.characterName}.jpg`
                    avatarPath = await uploadToStorage(filePath, fileBody);
                } catch (error) {
                    console.log("Could not save image to storage, using default image instead.")
                    avatarPath = "https://ih1.redbubble.net/image.2579899118.1732/st,small,507x507-pad,600x600,f8f8f8.jpg"
                }

                const response = await ctx.prisma.character.create({
                    data: {
                        characterName: input.characterName,
                        raceName: input.raceName,
                        genderName: input.genderName,
                        ageName: input.ageName,
                        avatarPath: avatarPath
                    },
                });

                return response.id;
            } catch (error) {
                console.error("Error creating character:", error);
                throw error;
            }
        }),
});