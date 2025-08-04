# TalkAI Widget - Project Information

## Project Context
Embeddable React chat widget for e-commerce websites, similar to Tawk.to or Intercom.

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Build main app  
- `npm run build:widget` - Build embeddable widget
- `npm run lint` - Run linting

## Important Files
- `src/widget.tsx` - Widget entry point
- `src/App.tsx` - Main app with routing
- `vite.config.ts` - Build configuration
- `CLAUDE.md` - Technical documentation

## Build Outputs
- `dist/` - Main app build for GitHub Pages
- `widget-dist/` - Widget build (IIFE format)
- `dist/widget.js` - Widget deployed to GitHub Pages

## Deployment
- GitHub Pages: https://quochuydev.github.io/woocommerce-talk-ai/
- Widget URL: https://quochuydev.github.io/woocommerce-talk-ai/widget.js
- Auto-deployment via GitHub Actions on push to main

## Development Notes
- Dual build system (app + widget)
- React + Vite + TypeScript + TailwindCSS
- No external dependencies for widget bundle
- Mobile-responsive design