# TalkAI Widget - Technical Documentation

## Project Overview

A standalone React-based chat widget using Vite, functioning like Tawk.to or Intercom. The widget embeds into any website using a simple `<script>` tag and provides AI-powered chat functionality for e-commerce sites.

## Architecture

### Build System
- **React + Vite** for development and bundling
- **Dual build modes**:
  - Main app: Standard SPA build with React Router
  - Widget: IIFE bundle for embedding (`window.TalkAIWidget`)
- **TailwindCSS** for styling with scoped classes to avoid conflicts
- **TypeScript** for type safety

### Bundle Configuration
```javascript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget'
  return {
    base: isWidget ? './' : '/woocommerce-talk-ai/',
    build: {
      outDir: isWidget ? 'widget-dist' : 'dist',
      ...(isWidget && {
        lib: {
          entry: './src/widget.tsx',
          name: 'TalkAIWidget',
          formats: ['iife'],
          fileName: 'widget'
        }
      })
    }
  }
})
```

## Message Types Support

The widget supports multiple message formats:

1. **Text Messages** - Standard user/AI text communication
2. **Image Messages** - Thumbnail display with full-size view
3. **Audio Messages** - Play button with audio controls
4. **Skeleton Loading** - Typing indicators during AI processing
5. **Product Cards** - E-commerce integration with title, price, image, CTA

## Widget Integration

### Global API
```javascript
window.TalkAIWidget.init({
  apiKey: 'required-api-key',
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  theme: 'light' | 'dark',
  primaryColor: '#FF3988',
  widgetId: 'custom-widget-id'
})
```

### Deployment Architecture
- **GitHub Pages** hosting at `https://username.github.io/woocommerce-talk-ai/`
- **CDN-ready** widget.js file for fast loading
- **Automatic deployments** via GitHub Actions
- **Cross-origin compatibility** with proper CORS handling

## Development Setup

### Local Development
```bash
npm install           # Install dependencies
npm run dev          # Start development server (main app)
npm run build        # Build main app to dist/
npm run build:widget # Build widget to widget-dist/
npm run preview      # Preview built app
```

### File Structure
```
src/
├── App.tsx          # Main app with routing
├── widget.tsx       # Widget entry point
├── pages/
│   ├── Home.tsx     # Demo/landing page
│   └── Chat.tsx     # Chat interface component
└── assets/          # Static assets
```

## Technical Features

### Responsive Design
- Mobile-first approach with touch-friendly controls
- Adaptive layout for different screen sizes
- Floating launcher that doesn't interfere with site content

### Style Isolation
- Scoped CSS classes to prevent conflicts with host site
- Optional shadow DOM implementation for complete isolation
- Customizable theming system

### API Integration
- External API support for AI responses
- Mock handlers for development/testing
- Configurable endpoints and authentication

### Performance
- Single bundle output (JS + CSS inlined)
- Lazy loading for optimal performance
- Minimal dependencies to reduce bundle size

## Deployment Pipeline

GitHub Actions workflow automatically:
1. Builds both main app and widget
2. Copies widget files to dist/ folder
3. Creates 404.html for client-side routing
4. Deploys to GitHub Pages

### Build Commands
- `npm run build` - Main app build
- `npm run build:widget` - Widget-only build
- Files copied: `widget.iife.js` → `widget.js`, `widget.css`

## Browser Compatibility

- Modern browsers (ES2020+)
- Mobile Safari and Chrome
- No jQuery dependency
- Uses native Web APIs where possible

## Security Considerations

- XSS protection through React's built-in sanitization
- CSP-friendly implementation
- Secure API key handling
- No sensitive data storage in localStorage

---

## Development Guidelines

- Use TypeScript for all new code
- Follow existing code conventions and patterns
- Test widget embedding on different sites
- Ensure mobile responsiveness
- Maintain small bundle size
- Document API changes in this file

## Build Commands Reference

```bash
# Development
npm run dev              # Start dev server on http://localhost:5173
npm run preview          # Preview production build

# Production builds
npm run build            # Build main app to dist/
npm run build:widget     # Build widget to widget-dist/

# Linting
npm run lint             # ESLint check
```

## Environment Variables

Create `.env.local` for local development:
```
VITE_API_ENDPOINT=https://your-api.com
VITE_API_KEY=your-development-key
```

## Important Instructions

- Always prefer editing existing files over creating new ones
- Never create documentation files unless explicitly requested
- Focus on functionality over extensive documentation
- Keep bundle size minimal for fast loading
- Test on multiple browsers and devices