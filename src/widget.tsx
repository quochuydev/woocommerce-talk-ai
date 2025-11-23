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
      ...config,
    }

    // Enhanced logging for widget
    this.log('info', 'ChatWidget initialized', this.config)
  }

  private log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
    const timestamp = new Date().toISOString()
    const logMessage = `[TalkAI-Widget-${level.toUpperCase()}] ${timestamp} - ${message}`

    console.group(logMessage)
    if (data) {
      console.log('Data:', data)
    }
    console.log('Widget Config:', this.config)
    console.log('Container ID:', this.config.containerId)
    console.log('Page URL:', window.location.href)
    console.trace('Stack trace')
    console.groupEnd()

    // Also log to console in a simplified way
    if (level === 'error') {
      console.error(logMessage, data)
    } else if (level === 'warn') {
      console.warn(logMessage, data)
    } else {
      console.log(logMessage, data)
    }
  }

  init() {
    this.log('info', 'Initializing widget')

    try {
      // Inject CSS if not already done
      this.log('info', 'Injecting CSS')
      this.injectCSS()

      // Create container if it doesn't exist
      this.container = document.getElementById(this.config.containerId!)
      if (!this.container) {
        this.log('info', 'Creating widget container', { containerId: this.config.containerId })
        this.container = document.createElement('div')
        this.container.id = this.config.containerId!
        this.container.style.cssText = this.getContainerStyles()
        document.body.appendChild(this.container)
        this.log('info', 'Widget container created and appended to body')
      } else {
        this.log('info', 'Using existing widget container', { containerId: this.config.containerId })
      }

      // Mount React app
      this.log('info', 'Mounting React app')
      this.root = createRoot(this.container)
      this.root.render(
        <React.StrictMode>
          <App widgetConfig={this.config} />
        </React.StrictMode>,
      )
      this.log('info', 'Widget initialization completed successfully')
    } catch (error) {
      this.log('error', 'Failed to initialize widget', error)
      throw error
    }
  }

  private injectCSS() {
    if (this.cssInjected) {
      this.log('info', 'CSS already injected, skipping')
      return
    }

    // Check if CSS is already loaded
    if (document.getElementById('talkai-widget-styles')) {
      this.log('info', 'CSS link already exists, skipping')
      return
    }

    // Try to load CSS from same domain as widget.js
    const currentScript = document.currentScript as HTMLScriptElement
    let cssUrl = './widget.css' // fallback

    if (currentScript && currentScript.src) {
      cssUrl = currentScript.src.replace(/widget\.js$/, 'widget.css')
    }

    this.log('info', 'Injecting CSS', { cssUrl, currentScript: currentScript?.src })

    // Create and inject CSS link
    const link = document.createElement('link')
    link.id = 'talkai-widget-styles'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = cssUrl
    link.onload = () => {
      this.cssInjected = true
      this.log('info', 'CSS loaded successfully', { cssUrl })
    }
    link.onerror = () => {
      this.log('warn', 'Could not load CSS, trying fallback', { originalUrl: cssUrl })
      // Fallback: try from GitHub Pages
      const fallbackCss = 'https://quochuydev.github.io/talk-ai-widget/widget.css'
      link.href = fallbackCss
    }

    document.head.appendChild(link)
    this.log('info', 'CSS link element added to head')
  }

  destroy() {
    this.log('info', 'Destroying widget')

    try {
      if (this.root) {
        this.log('info', 'Unmounting React root')
        this.root.unmount()
        this.root = null
      }

      if (this.container && this.container.parentNode) {
        this.log('info', 'Removing container from DOM')
        this.container.parentNode.removeChild(this.container)
        this.container = null
      }

      this.log('info', 'Widget destroyed successfully')
    } catch (error) {
      this.log('error', 'Error during widget destruction', error)
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
      'top-left': 'bottom: 20px; left: 20px;',
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
    console.log('[TalkAI-Widget] Initializing TalkAI Widget', config)

    try {
      const widget = new ChatWidget(config)
      widget.init()
      console.log('[TalkAI-Widget] Widget initialization completed')
      return widget
    } catch (error) {
      console.error('[TalkAI-Widget] Failed to initialize widget:', error)
      throw error
    }
  },
}

// Assign to window for IIFE builds
if (typeof window !== 'undefined') {
  window.TalkAIWidget = TalkAIWidget
}

export default TalkAIWidget
