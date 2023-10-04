# ✨ CharaNari ✨

*(Work in progress & temporary name)*  
https://www.charanari.me/  

Create your cute fantasy character, chat with your friends' characters, and build the world's lore!

![](/public/screenshots/week3-ui.gif)

### 📝 App

Created with [create-t3-app](https://create.t3.gg/) and deployed
using [Vercel with T3](https://create.t3.gg/en/deployment/vercel).

``` 
npm install            # install dependencies
npm run dev            # start the server locally
npm run build          # build the app for production (type safety errors)
git push origin main   # deploy to Vercel
```

<details>
    <summary>Components diagram</summary>
![diagram](https://github.com/nadiaenh/supabase-game/blob/main/public/components_diagram.png)
</details>


### 🎀 Frontend

[Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs) and [zod](https://zod.dev/) to validate
inputs.  

```
./public               # static files (images, etc.)
./src/pages/           # website pages (each .tsx file becomes a route)
./src/styles/          # CSS stylesheets
./src/components/      # React UI components
```

### 🎨 Design and Assets
Figma  
Procreate for Pixel Art  
[Dribble](https://dribbble.com/shots/popular)  
[RealtimeColours](https://realtimecolors.com/?colors=333333-F9F9F9-87CEEB-f0ece1-ba3b50)  
[Pixel to SVG](https://cdpn.io/shshaw/debug/XbxvNj)  

[anything-v3-better-vae](https://replicate.com/cjwbw/anything-v3-better-vae) for generating character images.  
[real-esrgan](https://replicate.com/cjwbw/real-esrgan) for upscaling low quality images.  
[RunwayML](https://app.runwayml.com/login) for expanding cropped or incomplete images.

### ⚙️ Backend

Uses [TypeScript](https://www.typescriptlang.org/) and [tRPC](https://trpc.io/).  

```
./src/env.mjs          # environment variables
./src/server/api/      # tRPC API routers and procedures 
```

### 🗄️ Database

[Prisma ORM with Supabase](https://www.prisma.io/docs/guides/database/supabase).

```
./prisma/schema.prisma  # contains all the database schemas.  
./prisma/seed.ts        # contains the data to populate the tables with.

npm run db              # whenever I update database schema.  
npx prisma studio       # to edit data in a nice UI.   
npx prisma db seed      # to populate the tables with starter data
```

### 📓 Progress journal

<details>
  <summary> 1️⃣ August 21 to 27:</summary>
- [X] Create Race etc. schemas and get form options from there
- [X] Update the UI with Tailwind components or ShadcnUI
- [X] Make SelectRace actually update the state - see how test.tsx implements SubmitButton
- [X] Set up basic OpenAI image generation
- [X] Fixed `npm run build` type safety errors (fixed some and turned off checking for others)
- [X] Character avatars now get saved to Supabase storage when a character is created
- [X] Switched over to ReplicateAI instead of OpenAI

![](/public/screenshots/week1-ui.gif)
</details>

<details>
<summary>2️⃣ August 28 to September 3:</summary>

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
</details>

<details>
<summary>3️⃣ September 4 to 10:</summary>
- [X] Have different pages for home, character creation, and character profile
- [X] Set up home page

![](/public/screenshots/week3-ui.gif)
</details>

<details>
<summary>4️⃣ September 11 to 17:</summary>  
🙈  
</details>

<details>
<summary>5️⃣ September 18 to 24:</summary>  
🙈  
</details>

<details>
<summary>6️⃣ September 25 to October 1:</summary>  
🙈  
</details>

<details>
<summary>7️⃣ October 2 to 8:</summary>  
- [ ] Store image permanent URLs in the database instead of the file path
- [ ] Design pixel art isometric cozy scene
</details>

