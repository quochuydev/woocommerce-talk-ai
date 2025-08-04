# 📦 Embeddable Chat Widget: `widget.js`

This document describes how to implement an embeddable chatbox widget using **Vite + React**, and how to use it on a WordPress or WooCommerce website by including a simple `<script>` tag.

---

## 🎯 Goal

Build a floating **React-based chat widget** that can be embedded on any website via a single JavaScript file. The widget will:

- Load a floating chat icon
- Expand into a full chatbox UI when clicked
- Support multiple message types:
  - Text message (from user or AI)
  - Image message (e.g. product preview)
  - Voice/audio message (playback support)
  - Skeleton loading (typing animation)
  - Product suggestion cards (image, name, price, button)
- Allow sending/receiving messages from a backend API (GPT or custom)

---

## 🛠️ Technical Implementation

### 🧩 Stack
- Vite + React
- TailwindCSS (optional)
- Exported as a **single bundled JS file** (`widget.js`)
- Configurable via `window.TalkAIWidget.init(options)`
- Rendered using a floating `<div>` injected into the host page
- Avoid CSS conflicts via unique class names or scoped styles
- Optional: use Shadow DOM for total isolation

---

## ✅ Embed API

### Global JS Entry

```html
<script src="https://YOUR_USERNAME.github.io/my-chat-widget/widget.js"></script>
```

### Init Function
The widget exposes a global window.TalkAIWidget.init() function.

```html
<script>
  window.TalkAIWidget.init({
    apiEndpoint: "https://yourdomain.com/api/chat",       // Required
    suggestProductEndpoint: "https://yourdomain.com/api/suggest", // Optional
    position: "bottom-right",                              // or "bottom-left"
    welcomeMessage: "Hi! How can I help you today?",
    theme: "light",                                        // or "dark"
    botName: "ShopBot",
    voiceEnabled: true,                                    // Optional
  });
</script>
```

---

### 🧩 Widget Behavior

A floating button appears (bottom-right by default)

On click, a chat panel expands from that corner

Messages sent by the user are sent to apiEndpoint via POST request

Special buttons in the UI can call suggestProductEndpoint or others

Message types are rendered differently:

- 🗨️ Text
- 🖼️ Images
- 🔊 Audio (with play control)
- 💬 Skeleton for loading
- 🛍️ Product cards

