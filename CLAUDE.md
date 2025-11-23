# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# TalkAI Widget - Technical Documentation

## Project Overview

A standalone React-based chat widget using Vite, functioning like Tawk.to or Intercom. The widget embeds into any website using a simple `<script>` tag and provides AI-powered chat functionality for e-commerce sites. Messages are stored in local state for the current session.

## Architecture

### Backend Integration
- **Local state management** - Messages persist only during the current session
- **No external dependencies** - Fully client-side implementation
- Ready for integration with custom AI endpoints or backend services

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

## Message Types & Data Structure

### Message Schema
```typescript
interface Message {
  id: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  duration?: number      // For voice messages (seconds)
  fileUrl?: string       // For file/image uploads
  fileName?: string
  fileSize?: number
  product?: {            // For product recommendations
    id: string
    title: string
    price: string
    image: string
    rating: number
    reviews: number
    url: string
  }
}
```

### Implementation Status
- ✅ **Text Messages** - Fully implemented with local state
- ✅ **Image Messages** - UI complete with preview
- ✅ **Audio/Voice Messages** - UI complete with recording (60s max)
- ✅ **File Attachments** - UI complete with drag & drop
- ✅ **Product Cards** - UI complete
- ✅ **Skeleton Loading** - Typing indicators during AI processing
- 📝 **Note**: All messages are client-side only. Backend integration needed for persistence.

## Widget Integration

### Global API
```javascript
window.TalkAIWidget.init({
  containerId: 'chat-widget-container', // optional custom container
  theme: 'light',                      // light | dark
  position: 'bottom-right',            // bottom-right | bottom-left | top-right | top-left
  apiEndpoint: undefined               // future feature for custom AI endpoint
})
```

### Session Management
- Messages persist in local component state during the current page session
- No persistence across page refreshes (can be added with localStorage/sessionStorage)
- Each widget instance maintains its own independent state

### Deployment Architecture
- **GitHub Pages** hosting at `https://quochuydev.github.io/woocommerce-talk-ai/`
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
├── App.tsx              # Main app with routing (widget/SPA modes)
├── widget.tsx           # Widget entry point and global API
├── main.tsx             # App entry point
├── index.css            # TailwindCSS + scoped widget styles
├── pages/
│   ├── Home.tsx         # Demo landing page
│   └── Chat.tsx         # Full chat interface with all message types
└── assets/              # Static assets
```

## Technical Features

### Responsive Design
- Mobile-first approach with touch-friendly controls
- Adaptive layout for different screen sizes
- Floating launcher that doesn't interfere with site content

### Advanced Features
- **Voice Recording**: 60-second maximum with visual waveform feedback
- **File Upload**: Drag & drop support with file type validation
- **Local State Management**: Messages stored in component state
- **Widget Positioning**: 4 corner positioning options
- **Theme System**: Light/dark mode support with custom colors
- **Product Cards**: Rich product recommendation display

### Style Isolation
- Scoped CSS classes to prevent conflicts with host site
- Customizable theming system
- Mobile-optimized touch interactions

### Performance
- Single bundle output (JS + CSS inlined for widget)
- Minimal dependencies (React, React Router, UUID)
- Widget bundle: ~261 KB (79 KB gzipped)
- No external API calls - fully client-side
- Lazy loading for optimal performance

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
- No external API calls or data transmission
- Messages stored in memory only (cleared on page refresh)

---

## Development Guidelines

- Use TypeScript for all new code
- Follow existing code conventions and patterns
- Test widget embedding on different sites
- Ensure mobile responsiveness
- Maintain small bundle size
- Document API changes in this file

## Development Commands

```bash
# Setup
npm install              # Install dependencies

# Development
npm run dev              # Start dev server on http://localhost:5173
npm run preview          # Preview production build locally

# Production builds
npm run build            # Build main app to dist/
npm run build:widget     # Build widget to widget-dist/ and copy to public/

# Code Quality
npm run lint             # ESLint check
```

## Implementation Priorities

### Current State
- ✅ All message types (text, voice, file, image, product) with UI
- ✅ Widget embedding and positioning
- ✅ Local state management for messages
- ✅ Responsive design with mobile support
- ✅ Optimized bundle size (~261 KB / 79 KB gzipped)

### Next Development Steps
1. **Add Backend Integration** - Connect to AI API endpoint for real responses
2. **Add Persistence** - Optional localStorage/sessionStorage for message history
3. **Implement Real File Handling** - Currently files are preview-only (blob URLs)
4. **Add Configuration Options** - Customizable colors, branding, welcome messages
5. **Analytics Integration** - Track widget usage and interactions

## Important Instructions

- Always prefer editing existing files over creating new ones
- Never create documentation files unless explicitly requested
- Focus on functionality over extensive documentation
- Keep bundle size minimal for fast widget loading
- Test widget embedding on different websites
- Ensure mobile responsiveness at all screen sizes
- Use TypeScript for all new code
- Messages are client-side only - no persistence or backend