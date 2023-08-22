# myGame

Some info about my game, with a GIF.

# Next steps

- [ ] Create Race etc. schemas and get form options from there
- [ ] Update the UI with Tailwind components or ShadcnUI

# Future work

- [ ] Upload images to Supabase (see **Setting Up the Supabase Client** & **Uploading an Image File to a Supabase
  Storage Bucket** [here](https://www.makeuseof.com/next-js-upload-images-supabase-storage-bucket/)).
- [ ] Set up authentication (see how T3 Turbo Supabase repo implements auth).

# How I built this

### App

Created with [create-t3-app](https://create.t3.gg/) and deployed
using [Vercel with T3](https://create.t3.gg/en/deployment/vercel).

**Commands:**  
`npm run dev` will start the server locally.  
`git push origin main` will deploy to Vercel.

### Frontend

Uses [Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs) and [zod](https://zod.dev/) to validate
inputs.

**File structure:**

- `./public` contains all the static files, e.g. images.
- `./src/pages/index.tsx` is the homepage.
- `./src/styles/globals.css` contains the Tailwind base stylesheets.

### Backend

Uses [TypeScript](https://www.typescriptlang.org/) and [TRPC](https://trpc.io/).

**File structure:**

- `./src/env.mjs` defines how to load the environment variables.
- `./src/server/api/`
    - `root.ts` defines what the available API endpoints are.
    - `db.ts` defines the database connections.
    - `trpc.ts` defines the context for the routers.
    - `routers` defines the functions for each router (API endpoint).

**Commands:**  
`npm run dev` to start the server locally.

### Database

Uses [Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase).

**File structure:**  
`./prisma/schema.prisma` contains all the database schemas.

**Commands:**  
Environment variables and schemas need to be set up properly before starting to run commands.

`npx prisma db push` to update database changes.  
`npx prisma studio` to edit data in a nice UI.  
`npx prisma format` to format the schema file.