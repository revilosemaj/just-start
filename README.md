# OJA — Portfolio

Personal portfolio website for **Oliver James Aco**, a Web Developer & Frontend Specialist from the Philippines with 7+ years of experience.

Live at: [ojaco.dev](https://ojaco.dev)

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Email** — EmailJS
- **Font** — Exo (Google Fonts)

## Sections

| Section | Description |
|---|---|
| Hero | Intro with name, bio, and social links |
| Services | Specialized skills — UI/UX, App Dev, Web Dev |
| Portfolio | Featured projects with live site previews |
| Experience | Work history timeline |
| Testimonials | Client feedback |
| Education & Skills | Degrees and technical skill bars |
| Contact | Email contact form via EmailJS |

## Editing Content

All text content lives in one file — **`lib/content.ts`**. Edit it to update names, bios, job history, skills, testimonials, links, etc. without touching any component files.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file for the contact form:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Scripts

```bash
npm run dev      # development server (Turbopack)
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
```

## Project Structure

```
app/
  (home)/page.tsx       # Main page — scroll & section state
  globals.css           # Global styles & section utilities
  layout.tsx            # Root layout & font config

components/
  Nav.tsx               # Fixed navigation bar
  FullScreenMenu.tsx    # Mobile full-screen menu
  Footer.tsx            # Footer with contact info & socials
  ScrollToTopButton.tsx # Scroll-to-top button
  PageSections/
    Hero.tsx
    Services.tsx
    Projects.tsx
    WorkExperience.tsx
    Testimonials.tsx
    EducationSkills.tsx
    Contact.tsx

lib/
  content.ts            # All text content — edit here
```
