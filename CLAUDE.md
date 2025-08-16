# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Neatly is a cooking recipe app that extracts ingredients from recipe websites and generates organized shopping lists. The main application code is located in the `neatly-app/` directory.

### Core Features
- Recipe URL parsing and ingredient extraction
- Shopping list generation grouped by ingredient type
- Multiple recipe aggregation into single shopping list
- Export functionality (copy/paste, text, email)
- User authentication via phone/email

### Planned Features
- AI voice cooking assistant with smart home integration
- Clean recipe view with step-by-step instructions
- Recipe saving and management
- PWA capabilities

## Project Structure

This is a Next.js 15 application with TypeScript and Tailwind CSS, designed as a PWA with Supabase backend and Vercel edge functions.

Key directories:
- `neatly-app/src/app/`: Next.js App Router pages and layouts
- `neatly-app/public/`: Static assets (SVG icons)
- `neatly-app/src/app/globals.css`: Global styles with Tailwind CSS

## Development Commands

All commands should be run from the `neatly-app/` directory:

```bash
cd neatly-app
```

### Essential Commands
- `npm run dev`: Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build`: Build production bundle
- `npm run start`: Start production server
- `npm run lint`: Run ESLint with Next.js TypeScript configuration

### TypeScript Configuration
- TypeScript strict mode is enabled
- Path alias: `@/*` maps to `./src/*`
- Uses Next.js plugin for TypeScript

## Tech Stack

- **Framework**: Next.js 15 with App Router (PWA-ready)
- **Language**: TypeScript with strict mode
- **Backend**: Supabase (planned)
- **Functions**: Vercel Edge Functions (planned)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Linting**: ESLint with Next.js TypeScript rules
- **Build Tool**: Turbopack (development), Next.js bundler (production)
- **Authentication**: Phone/email-based (planned)

## Architecture Notes

- Uses Next.js App Router architecture (not Pages Router)
- Designed as Progressive Web App (PWA)
- Root layout configured with custom fonts and antialiasing
- Currently contains default Next.js starter page structure
- Static assets use Next.js Image component for optimization
- CSS Variables used for font configuration

### Key Development Areas
- Recipe URL parsing and web scraping functionality
- Ingredient categorization and shopping list optimization
- User authentication system integration
- Export mechanisms (clipboard, SMS, email)
- Future: Voice assistant integration and smart home connectivity

## Configuration Files

- `next.config.ts`: Next.js configuration (minimal setup)
- `tsconfig.json`: TypeScript compiler options with Next.js plugin
- `eslint.config.mjs`: ESLint configuration using FlatCompat
- `postcss.config.mjs`: PostCSS configuration for Tailwind CSS