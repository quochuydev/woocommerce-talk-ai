import { useState } from 'react'
import Chat from './pages/Chat'

interface WidgetConfig {
  containerId?: string
  theme?: 'light' | 'dark'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  apiEndpoint?: string
}

interface AppProps {
  widgetConfig?: WidgetConfig
}

function App({ widgetConfig }: AppProps = {}) {
  const [isWidgetMinimized, setIsWidgetMinimized] = useState(false)
  const [isWidgetClosed, setIsWidgetClosed] = useState(false)

  // If running as widget, show chat directly
  if (widgetConfig) {
    const handleMinimize = () => {
      setIsWidgetMinimized(!isWidgetMinimized)
    }

    const handleClose = () => {
      setIsWidgetClosed(true)
    }

    if (isWidgetClosed) {
      return null
    }

    if (isWidgetMinimized) {
      return (
        <div className="widget-root">
          <button
            onClick={handleMinimize}
            className="tw-w-16 tw-h-16 tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-shadow-2xl tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-shadow-3xl hover:tw-scale-105 tw-transition-all tw-duration-300 tw-border-4 tw-border-white"
            title="Open chat"
          >
            <svg className="tw-w-8 tw-h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" />
            </svg>
            <div className="tw-absolute tw--top-1 tw--right-1 tw-w-4 tw-h-4 tw-bg-green-500 tw-rounded-full tw-border-2 tw-border-white tw-animate-pulse"></div>
          </button>
        </div>
      )
    }

    return (
      <div className="widget-root">
        <Chat isWidget={true} onMinimize={handleMinimize} onClose={handleClose} />
      </div>
    )
  }

  // Normal app - show chat directly
  return (
    <div className="widget-root">
      <Chat />
    </div>
  )
}

export default App
