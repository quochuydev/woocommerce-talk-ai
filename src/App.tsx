import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
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
  // If running as widget, show chat directly
  if (widgetConfig) {
    return (
      <div className="widget-root">
        <Chat isWidget={true} />
      </div>
    )
  }

  // Normal app routing
  return (
    <Router basename="/woocommerce-talk-ai">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
