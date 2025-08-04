# CLAUDE.md

I want to build a standalone React-based chatbox app using Vite. The app will function like a floating chat widget (similar to Tawk.to or Intercom), and it will be embedded into any website, including WooCommerce, using a simple <script src="..."></script> snippet.

## Goals:
- Create a deployable, embeddable JavaScript chat widget (React + Vite)
- Supports different message types:
  - Text message (from user or AI)
  - Image message (thumbnail or full)
  - Audio message (with play button)
  - Skeleton loading (typing indicator)
  - Product suggestion cards (title, price, image, button)
- Loads as a floating chat icon on the page
- Expands into a chatbox UI on click
- Fetches/generates responses via external APIs (e.g., OpenAI or my own REST API)
- Style with TailwindCSS

## Technical Requirements:
- **React + Vite app**
- **Output as UMD or IIFE** so it can be included via a <script> tag on any site
- **Expose global init function**, e.g. `window.MyChatWidget.init({ options })`
- All assets (CSS, JS) must be bundled together
- Widget must not conflict with host website styles (use shadow DOM or class scoping)
- Should support external API config (via props): for sending/receiving messages
- Design should be responsive (mobile support)
- Include voice/audio messages (record or play, optional recording fallback)
- Include mock API handlers to simulate real chat flow
- Deploy-ready for hosting on CDN or subdomain (e.g., chat.mysite.com/widget.js)

## UI Features:
- Floating launcher icon
- Expandable chatbox UI
- Message thread with different message types:
  - text, image, audio, skeleton loading
  - suggestion/product card (title, image, price, CTA)
- Input field with send button
- Button to call external API (e.g., "Get Product Suggestion")

## Development:
- Scaffold with Vite + React + TailwindCSS
- Optionally support Voice input (Web Speech API or third-party)
- Support basic theming (dark/light mode)
- Avoid dependencies that require server (can mock backend if needed)

## Delivery:
- Final JS file that can be loaded via:
  <script src="https://yourcdn.com/chat-widget.js"></script>
- When loaded, `window.MyChatWidget.init({...})` mounts it on the page
- All bundled in single output (CSS + JS)
