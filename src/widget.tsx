import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

interface WidgetConfig {
  containerId?: string
  theme?: 'light' | 'dark'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  apiEndpoint?: string
}

class ChatWidget {
  private root: any = null
  private container: HTMLElement | null = null
  private config: WidgetConfig
  private cssInjected: boolean = false

  constructor(config: WidgetConfig = {}) {
    this.config = {
      containerId: 'chat-widget-container',
      theme: 'light',
      position: 'bottom-right',
      ...config
    }
  }

  init() {
    // Inject CSS if not already done
    this.injectCSS()
    
    // Create container if it doesn't exist
    this.container = document.getElementById(this.config.containerId!)
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.id = this.config.containerId!
      this.container.style.cssText = this.getContainerStyles()
      document.body.appendChild(this.container)
    }

    // Mount React app
    this.root = createRoot(this.container)
    this.root.render(
      <React.StrictMode>
        <App widgetConfig={this.config} />
      </React.StrictMode>
    )
  }

  private injectCSS() {
    if (this.cssInjected) return
    
    // Check if CSS is already loaded
    if (document.getElementById('talkai-widget-styles')) return
    
    // Try to load CSS from same domain as widget.js
    const currentScript = document.currentScript as HTMLScriptElement
    let cssUrl = './widget.css' // fallback
    
    if (currentScript && currentScript.src) {
      cssUrl = currentScript.src.replace(/widget\.js$/, 'widget.css')
    }
    
    // Create and inject CSS link
    const link = document.createElement('link')
    link.id = 'talkai-widget-styles'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = cssUrl
    link.onload = () => { this.cssInjected = true }
    link.onerror = () => {
      console.warn('TalkAI Widget: Could not load CSS from', cssUrl)
      // Fallback: try from GitHub Pages
      const fallbackCss = 'https://quochuydev.github.io/woocommerce-talk-ai/widget.css'
      link.href = fallbackCss
    }
    
    document.head.appendChild(link)
  }

  destroy() {
    if (this.root) {
      this.root.unmount()
      this.root = null
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
      this.container = null
    }
  }

  private getContainerStyles(): string {
    const baseStyles = `
      position: fixed;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `
    
    const positionStyles = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'bottom: 20px; right: 20px;',
      'top-left': 'bottom: 20px; left: 20px;'
    }

    return baseStyles + positionStyles[this.config.position!]
  }
}

// Global API
declare global {
  interface Window {
    TalkAIWidget: {
      init: (config?: WidgetConfig) => ChatWidget
    }
  }
}

const TalkAIWidget = {
  init: (config?: WidgetConfig) => {
    const widget = new ChatWidget(config)
    widget.init()
    return widget
  }
}

// Assign to window for IIFE builds
if (typeof window !== 'undefined') {
  window.TalkAIWidget = TalkAIWidget
}

export default TalkAIWidget