# Lotus Impex

Modern export business website built with Next.js, TypeScript, App Router, Tailwind CSS, SEO metadata, security headers, responsive UI, and local enquiry API.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Main pages

- `/` Home
- `/products` Export categories
- `/products/ladies-garments`
- `/products/mens-garments`
- `/products/fabrics`
- `/products/accessories`
- `/products/machinery`
- `/products/general-goods`
- `/company`
- `/contact`
- `/privacy`

## Later database connection

The contact form currently posts to `/api/enquiry` and returns a local success response. Later you can connect MongoDB or another database inside `app/api/enquiry/route.ts`.
