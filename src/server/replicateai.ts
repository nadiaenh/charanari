import Replicate from "replicate";
import {env} from "~/env.mjs";

const globalForReplicate = globalThis as unknown as {
    replicate: Replicate | undefined;
};

export const replicate =
    globalForReplicate.replicate ??
    new Replicate({
        auth: env.REPLICATE_API_TOKEN,
    });

