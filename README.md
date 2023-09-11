# ✨ CharaNari ✨

*(Work in progress & temporary name)*  
https://www.charanari.me/  

Create your cute fantasy character, chat with your friends' characters, and build the world's lore!

![](/public/screenshots/week3-ui.gif)

### 📝 App

Created with [create-t3-app](https://create.t3.gg/) and deployed
using [Vercel with T3](https://create.t3.gg/en/deployment/vercel).

`npm run dev` will start the server locally.  
`git push origin main` will deploy to Vercel.

![diagram](https://github.com/nadiaenh/supabase-game/blob/main/public/components_diagram.png)

### 🎀 Frontend

Uses [Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs) and [zod](https://zod.dev/) to validate
inputs.  
`./public` contains all the static files for the project, e.g. images.  
`./src/pages/` contains the website pages - each `.tsx` file becomes a route in the App.  
`./src/styles/` contains the CSS stylesheets.  
`./src/components/` should contain the React UI components.

### 🎨 Design
Developed using Figma, [Dribble](https://dribbble.com/shots/popular), and [RealtimeColours](https://realtimecolors.com/?colors=333333-F9F9F9-87CEEB-f0ece1-ba3b50).  
  
Light mode:  
<span style="background-color:#F9F9F9; color:#F9F9F9;">■■■■■</span>
<span style="background-color:#333333; color:#333333;">■■■■■</span>
<span style="background-color:#87CEEB; color:#87CEEB;">■■■■■</span>
<span style="background-color:#f0ece1; color:#f0ece1;">■■■■■</span>
<span style="background-color:#ba3b50; color:#ba3b50;">■■■■■</span>

Dark mode:  
<span style="background-color:#333333; color:#333333;">■■■■■</span>
<span style="background-color:#F9F9F9; color:#F9F9F9;">■■■■■</span>
<span style="background-color:#87CEEB; color:#87CEEB;">■■■■■</span>
<span style="background-color:#262113; color:#262113;">■■■■■</span>
<span style="background-color:#e4aab4; color:#e4aab4;">■■■■■</span>  

Fonts: Concert One, Ubuntu Sans

### ⚙️ Backend

Uses [TypeScript](https://www.typescriptlang.org/) and [tRPC](https://trpc.io/).  
`./src/env.mjs` defines how to load the environment variables.
`./src/server/api/trpc.ts` initializes tRPC and lets you create routers and procedures.  
`./src/server/api/root.ts` imports and combines all the different routers into the main App route.  
`./src/server/api/db.ts` creates and exports the Prisma client so it can be used in the App.  
`./src/server/api/routers/` has files (routers) where you can define the functions that can be used for each router.

### 🗄️ Database

Uses [Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase).

`./prisma/schema.prisma` contains all the database schemas.  
`./prisma/seed.ts` contains the data to populate the tables with.

`npm run db` whenever I update database schema.  
`npx prisma studio` to edit data in a nice UI.   
`npx prisma db seed` to populate the tables with starter data

### 🤖 AI 

Using Replicate.ai API for images mostly.

[anything-v3-better-vae](https://replicate.com/cjwbw/anything-v3-better-vae) for generating character images.  
[real-esrgan](https://replicate.com/cjwbw/real-esrgan) for upscaling low quality images.  
[RunwayML](https://app.runwayml.com/login) for expanding cropped or incomplete images.  

### 📓 Progress journal

**1️⃣ August 21 to 27:**

- [X] Create Race etc. schemas and get form options from there
- [X] Update the UI with Tailwind components or ShadcnUI
- [X] Make SelectRace actually update the state - see how test.tsx implements SubmitButton
- [X] Set up basic OpenAI image generation
- [X] Fixed `npm run build` type safety errors (fixed some and turned off checking for others)
- [X] Character avatars now get saved to Supabase storage when a character is created
- [X] Switched over to ReplicateAI instead of OpenAI

![](/public/screenshots/week1-ui.gif)

**2️⃣ August 28 to September 3:**

- [X] Add more form fields + update database schema accordingly
- [X] Improve the UI
- [X] Set up (temporary?) domain name https://www.charanari.me/  
- [X] Add images for character race selection
- [X] ~~Set up Clerk authentication~~ rolled this back for now due to issues
- [X] Create horizontal visual selector component
- [X] Prompt engineering for character images
- [X] Set up getCharacterById -> display it in page
- [X] Enable basic dark mode

![](/public/screenshots/week2-ui.gif)

**3️⃣ September 4 to 10:**
- [X] Have different pages for home, character creation, and character profile
- [X] Set up home page

![](/public/screenshots/week3-ui.gif)

**4️⃣ September 11 to 17:**
- [ ] Store image permanent URLs in the database instead of the file path
- [ ] Remove unnecessary React hooks
- [ ] Restore Clerk auth and customize the sign-in page

**👵🏽 Future, future work:**

- [ ] Set
  up [Supabase database backups](https://supabase.com/dashboard/project/niyrisfdjxcwffpdpzqp/database/backups/scheduled) (
  on Pro plan only) or figure out the `pg dump` manual SQL command thing`.