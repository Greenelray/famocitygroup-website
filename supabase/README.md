# Supabase Setup

To turn the Famocity course prototype into a real database-backed system, complete these steps in your Supabase project.

## 1. Create the project

- Create a new project in Supabase.
- Open `Project Settings` -> `API`.
- Copy:
  - `Project URL`
  - `anon public` key
  - `service_role` key

## 2. Add the environment keys

Open `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## 3. Create the database tables

- Open the `SQL Editor` in Supabase.
- Paste the contents of `supabase/schema.sql`.
- Run the script.

This creates:
- `profiles`
- `purchases`
- `enrollments`

## 4. Create the course-content tables

- In the `SQL Editor`, open a new query.
- Paste the contents of `supabase/course-content.sql`.
- Run the script.

This creates:
- `courses`
- `course_modules`
- `course_lessons`

## 5. Keep email confirmation simple for now

Because the app creates users from the backend, you can leave email confirmation off for this first version.

If you later want email verification, we can add a proper verification flow.

## 6. Restart the app

After updating `.env.local`, restart the local server:

```powershell
cmd /c npm run dev
```

## 7. Import your current course content

- Open `/admin`
- Use the import action there to copy the current code-based course into Supabase

After that, the live course pages will start reading from Supabase first.

## 8. Test the real flow

1. Go to `/signup`
2. Create a learner account with name, email, and password
3. Go to `/courses`
4. Buy a course through Paystack test mode
5. Complete payment
6. Confirm the course appears in `/my-courses`

## What is now real

Once Supabase is connected:
- user accounts are saved in Supabase Auth
- profile records are saved in the database
- purchases are saved in `purchases`
- course access is saved in `enrollments`

## Current limitation

The admin flow currently focuses on importing and reading real course content from Supabase.

The next upgrade after that is a full browser-based editor for:
- creating courses
- editing modules
- editing lessons
- publishing and unpublishing content
