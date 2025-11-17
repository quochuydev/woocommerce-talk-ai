# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# TalkAI Widget - Technical Documentation

## Project Overview

A standalone React-based chat widget using Vite, functioning like Tawk.to or Intercom. The widget embeds into any website using a simple `<script>` tag and provides AI-powered chat functionality for e-commerce sites with Firebase backend integration.

## Architecture

### Backend Integration
- **Firebase Firestore** for real-time message persistence
- **Firebase Storage** for file/image uploads (configured, not fully implemented)
- **Firebase Auth** for user authentication (configured)
- Environment variables for Firebase configuration via `.env` files

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

### Firebase Message Schema
```typescript
interface FirebaseMessage {
  id?: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp?: any // Firebase timestamp
  storedAt?: string
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
- ✅ **Text Messages** - Fully implemented with Firebase persistence
- 🚧 **Image Messages** - UI complete, Firebase storage pending
- 🚧 **Audio/Voice Messages** - UI complete with recording, Firebase storage pending
- 🚧 **File Attachments** - UI complete, Firebase storage pending
- 🚧 **Product Cards** - UI complete, Firebase storage pending
- ✅ **Skeleton Loading** - Typing indicators during AI processing

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
- Unique session IDs generated using `uuid` for each chat instance
- Conversations stored in Firebase Firestore with session-based organization
- Real-time synchronization across multiple browser tabs

### Deployment Architecture
- **GitHub Pages** hosting at `https://quochuydev.github.io/woocommerce-talk-ai/`
- **CDN-ready** widget.js file for fast loading
- **Automatic deployments** via GitHub Actions
- **Cross-origin compatibility** with proper CORS handling

## Firebase Development Setup

### Prerequisites
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase account
firebase login

# Initialize Firebase project (if not already done)
firebase init hosting
```

### Environment Configuration
Required environment variables (create `.env` file):
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Local Development with Firebase Emulator
```bash
# Start Firebase emulators
firebase emulators:start

# The app will automatically use emulators when detected
# Text messages persist locally, other message types are UI-only
```

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
│   └── Chat.tsx         # Full chat interface (750+ lines)
├── firebase/
│   ├── config.js        # Firebase configuration (environment variables)
│   ├── firestore.js     # Database operations
│   ├── auth.js          # Authentication
│   ├── storage.js       # File storage
│   └── types.ts         # TypeScript interfaces
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
- **Real-time Sync**: Firebase-powered message synchronization
- **Session Persistence**: Conversations survive page refreshes
- **Widget Positioning**: 4 corner positioning options
- **Theme System**: Light/dark mode support with custom colors

### Style Isolation
- Scoped CSS classes to prevent conflicts with host site
- Customizable theming system
- Mobile-optimized touch interactions

### Performance
- Single bundle output (JS + CSS inlined for widget)
- Minimal dependencies (React, Firebase, UUID, React Router)
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

## Development Commands

```bash
# Setup
npm install              # Install dependencies
npm install -g firebase-tools  # Install Firebase CLI
firebase login           # Authenticate with Firebase

# Development
npm run dev              # Start dev server on http://localhost:5173
npm run preview          # Preview production build locally

# Production builds
npm run build            # Build main app to dist/
npm run build:widget     # Build widget to widget-dist/ and copy to public/

# Code Quality
npm run lint             # ESLint check

# Firebase
firebase emulators:start # Start local Firebase emulators
firebase deploy          # Deploy to Firebase Hosting (optional)
```

## Implementation Priorities

### Current State
- ✅ Text messages with Firebase persistence
- 🚧 UI for images, voice, files, products (backend storage pending)
- ✅ Widget embedding and positioning
- ✅ Real-time synchronization for text messages

### Next Development Steps
1. **Complete Firebase Storage Integration** for non-text message types
2. **Implement AI Response Integration** (currently UI mock responses)
3. **Add Security Rules** for Firebase operations
4. **Optimize Bundle Size** for faster widget loading

## Important Instructions

- Always prefer editing existing files over creating new ones
- Never create documentation files unless explicitly requested
- Focus on functionality over extensive documentation
- Keep bundle size minimal for fast widget loading
- Test widget embedding on different websites
- Ensure mobile responsiveness at all screen sizes
- Use TypeScript for all new code
- Follow existing Firebase patterns for consistency