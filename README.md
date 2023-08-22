
# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Resources

[Create T3 app](https://create.t3.gg/)  
[Prisma schema setup](https://www.prisma.io/docs/guides/database/supabase)  
[Deploy T3 app to Vercel](https://create.t3.gg/en/deployment/vercel)  

## Commands

`npx prisma db push` after setting up my env variables and my Prisma schema  
`npm run dev` to start the server 

## Database

All schemas are in `schema.prisma`  
`npx prisma studio` to edit data in a nice UI (might need to run `npx prisma db push` first if schemas were updated).  
`npx prisma format` to format the schema file.  

To upload images, check out **Setting Up the Supabase Client** & **Uploading an Image File to a Supabase Storage Bucket** [here](https://www.makeuseof.com/next-js-upload-images-supabase-storage-bucket/).

## Backend

It exists in the `src/server` folder.  
`import { z } from "zod"` - zod is a library for data validation. You can validate data before it is sent to the database, e.g. `z.string().min(1).max(255)`.  
`api/root.ts` defines the API endpoints, i.e. the functions that can be called from the frontend.  
`api/trpc.ts` defines the context for the routers.  

## Auth 

Look at how T3 Turbo Supabase repo implements auth.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
