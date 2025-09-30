# TK Portfolio

A personal portfolio website built with React, Vite, Tailwind CSS v4, and Framer Motion.
It showcases Tazkhan's profile, skills, experience, featured projects, certificates, and contact details in a polished responsive UI.

## Overview

This project includes:

- A hero/profile section with social links and resume download
- Dedicated sections for about, experience, projects, activities, skills, and contact
- A certificates gallery with detail pages using React Router
- A floating AI assistant for quick portfolio Q&A
- Dark mode and light mode support
- Responsive layouts with animated UI elements

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion
- React Router DOM
- React Icons
- ESLint

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build in `dist/`
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Project Structure

```text
src/
  assets/
    CertificateImage/     certificate and internship images
    ProjectIMG/           project preview images
  components/
    AboutMe.jsx
    ActivitiesSection.jsx
    AIChatbot.jsx
    CertificatesWithDetail.jsx
    ExperienceSection.jsx
    FeaturedProjects.jsx
    GetInTouch.jsx
    Layout.jsx
    ProfilePage.jsx
    SkillsSection.jsx
  context/
    ThemeContext.jsx
  App.jsx
  index.css
  main.jsx
```

## Main Features

### Homepage Sections

The homepage is composed of:

- `ProfilePage`
- `AboutMe`
- `ExperienceSection`
- `FeaturedProjects`
- `ActivitiesSection`
- `SkillsSection`
- `GetInTouch`

### Certificates Route

`CertificatesWithDetail.jsx` handles:

- `/certificates`
- `/certificates/:id`

Visitors can browse certificate cards and open a dedicated detail view for each item.

### Theme Support

The project uses a shared theme context for dark mode and light mode.
The selected theme is saved in `localStorage` and applied globally through the layout.

### AI Chatbot

`AIChatbot.jsx` provides a floating assistant that answers common questions about:

- skills
- projects
- experience
- certificates
- contact information

## Notes

- The project references `/noise.png` for texture effects. If it is missing from `public/`, that texture will not appear.
- Resume download expects `public/resume.pdf` to exist.

## Deployment

The app builds to the `dist/` folder and can be deployed to Vercel, Netlify, GitHub Pages, or any static hosting provider.

## License

This project is intended for personal portfolio use.
