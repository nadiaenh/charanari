// noinspection TypeScriptValidateTypes

import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {supabase} from "~/server/supabase";
import axios, {type AxiosResponse} from "axios";
import {replicate} from "~/server/replicateai";

const model = "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65";
const BASE_PROMPT = "best quality, illustration, beautiful detailed, colorful, face and torso, sfw";
const NEGATIVE_PROMPT = "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, jpeg artifacts, signature, watermark, username, blurry, artist name, nudity, nsfw";

async function generateImage(characterPrompts: string) {
    console.log("Generating image using replicate.ai...")
    const prompt = BASE_PROMPT + characterPrompts;

    const input = {
        input: {
            prompt: prompt,
            negative_prompt: NEGATIVE_PROMPT,
            width: 512,
            height: 512,
        }
    };

    const response = await replicate.run(model, input) as unknown as string;
    return response[0];
}

async function downloadImage(imageURL: string): Promise<Buffer> {
    console.log("Downloading image using axios...");

    const axiosResponse: AxiosResponse<ArrayBuffer> = await axios.get<ArrayBuffer>(imageURL, {responseType: 'arraybuffer'});
    console.log("Axios response: ", JSON.stringify(axiosResponse));

    const axiosResponseData: ArrayBuffer = axiosResponse.data ?? {};
    return Buffer.from(axiosResponseData);
}

async function uploadToStorage(filePath: string, fileBody: Buffer): Promise<void> {
    console.log("Uploading image to Supabase storage...")

    await supabase.storage.from('avatars')
        .upload(filePath, fileBody, {
            cacheControl: '3600',
            upsert: true
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
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

            const imageURL = await generateImage(input.prompts);

            // Upload image to Supabase storage
            // const fileBody: Buffer = await downloadImage(imageURL);
            // const filePath = `${imageURL}`;
            // await uploadToStorage(filePath, fileBody);

            console.log("Creating character in database...");
            await ctx.prisma.character.create({
                data: {
                    characterName: input.characterName,
                    raceName: input.raceName,
                    genderName: input.genderName,
                    ageName: input.ageName,
                    avatarPath: imageURL
                },
            });

            console.log(imageURL);
            return imageURL;
        }),
});