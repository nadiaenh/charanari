# Weekly progress on this project

## August 21 to 27

- [X] Create Race etc. schemas and get form options from there
- [X] Update the UI with Tailwind components or ShadcnUI
- [X] Make SelectRace actually update the state - see how test.tsx implements SubmitButton
- ~~[ ] Make SubmitForm open a popup to create a character~~
  in <Head> as preloaded for NextJS
- [X] Set up basic OpenAI image generation
- [X] Fixed `npm run build` type safety errors (fixed some and turned off checking for others)
- [X] Character avatars now get saved to Supabase storage when a character is created
- [X] Switched over to ReplicateAI instead of OpenAI

**Up next:**

- [ ] Set the path for the avatar based on the username OR save the full file path in the database
- [ ] Add more form fields
- [ ] UI improvements:
    - Find a cute [free loading animation gif](https://lottiefiles.com/featured) to use as my loading screen - put it
    - Set up a nice looking UI
- [ ] Set up user authentication (see how T3 Turbo Supabase repo implements auth).
- [ ] Add try/catches in all my logic

**Future, future work:**

- [ ] Set
  up [Supabase database backups](https://supabase.com/dashboard/project/niyrisfdjxcwffpdpzqp/database/backups/scheduled) (
  on Pro plan only) or figure out the `pg dump` manual SQL command thing`.