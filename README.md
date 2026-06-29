# Skalvi International School Redesign

Production-ready Next.js App Router redesign for Skalvi International School with TypeScript, Tailwind CSS, Framer Motion, Prisma, PostgreSQL and NextAuth.

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
2. Install dependencies with `npm install`.
3. Run `npm run prisma:migrate`.
4. Run `npm run seed`.
5. Start development with `npm run dev`.

## Admin

The hidden admin route is `/secure-admin`. The seed command creates the first `SUPER_ADMIN` account from `.env`.

## Asset Note

The requested uploaded PDF with school photographs was not present in this workspace. The three PDFs found in `source-assets/` are witness letters and a uniform invoice, not school photo collections. To avoid stock or generated photography, this implementation uses only official Skalvi website assets already published by the school, plus the official logo. Drop the real PDF into `source-assets/` and extract/categorize images into `public/images/school` to replace or expand the current gallery.
