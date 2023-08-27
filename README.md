# need to find a nice catchy name for this project

also need to change the [domain name](https://supabase-game.vercel.app/)

also need to put a nice GIF here when I have a cute UI

### Infrastructure diagram

Might clean it up later

![diagram](https://github.com/nadiaenh/supabase-game/blob/main/public/components_diagram.png)

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

- `./public` contains all the static files for the project, e.g. images.
- `./src/pages/` contains the website pages - each `.tsx` file becomes a route in the App.
- `./src/styles/` contains the CSS stylesheets.
- `./src/components/` should contain the React UI components.

### Backend

Uses [TypeScript](https://www.typescriptlang.org/) and [tRPC](https://trpc.io/).

**File structure:**

- `./src/env.mjs` defines how to load the environment variables.
- `./src/server/api/`
    - `trpc.ts` initializes tRPC and lets you create routers and procedures.
    - `root.ts` imports and combines all the different routers into the main App router.
    - `db.ts` creates and exports the Prisma client so it can be used in the App.
    - `routers/` has files (routers) where you can define the functions that can be used for each router.

**Commands:**  
`npm run dev` to start the server locally.

### Database

Uses [Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase).

**File structure:**  
`./prisma/schema.prisma` contains all the database schemas.  
`./prisma/seed.ts` contains the data to populate the tables with.

**Commands:**  
Environment variables and schemas need to be set up properly before starting to run commands.

`npx prisma studio` to edit data in a nice UI.  
`npm run db` whenever I update database schema.  
`npx prisma db seed` to populate the tables with data from `./prisma/seed.ts` -- **this will delete all rows currently
in all tables!!**

### Progress journal

**August 21 to 27:**

- [X] Create Race etc. schemas and get form options from there
- [X] Update the UI with Tailwind components or ShadcnUI
- [X] Make SelectRace actually update the state - see how test.tsx implements SubmitButton
- ~~[ ] Make SubmitForm open a popup to create a character~~
  in <Head> as preloaded for NextJS
- [X] Set up basic OpenAI image generation
- [X] Fixed `npm run build` type safety errors (fixed some and turned off checking for others)
- [X] Character avatars now get saved to Supabase storage when a character is created
- [X] Switched over to ReplicateAI instead of OpenAI

![](/public/screenshots/week1-ui.gif)

**August 28 to September 3:**

- [ ] Set up user authentication (see how T3 Turbo Supabase repo implements auth).

**Up next:**

- [ ] Set the path for the avatar based on the username OR save the full file path in the database
- [ ] Add more form fields
- [ ] UI improvements:
    - Find a cute [free loading animation gif](https://lottiefiles.com/featured) to use as my loading screen - put it
    - Set up a nice looking UI
- [ ] Add try/catches in all my logic

**Future, future work:**

- [ ] Set
  up [Supabase database backups](https://supabase.com/dashboard/project/niyrisfdjxcwffpdpzqp/database/backups/scheduled) (
  on Pro plan only) or figure out the `pg dump` manual SQL command thing`.