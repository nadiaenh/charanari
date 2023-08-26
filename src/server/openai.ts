import OpenAI from "openai";
import {env} from "~/env.mjs";

const globalForOpenAI = globalThis as unknown as {
    openai: OpenAI | undefined;
};

export const openai =
    globalForOpenAI.openai ??
    new OpenAI({
        apiKey: env.OPENAI_API_KEY,
    });


