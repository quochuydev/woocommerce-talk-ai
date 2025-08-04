import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="chat-widget-root chat-min-h-screen chat-bg-gray-100 chat-flex chat-items-center chat-justify-center">
      <div className="chat-max-w-md chat-mx-auto chat-bg-white chat-rounded-lg chat-shadow-lg chat-p-8">
        <h1 className="chat-text-3xl chat-font-bold chat-text-center chat-text-gray-800 chat-mb-8">
          Chat Widget Demo
        </h1>
        <div className="chat-space-y-4">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="chat-button-primary chat-w-full"
          >
            Test Button - Count is {count}
          </button>
          <p className="chat-text-sm chat-text-gray-600 chat-text-center">
            TailwindCSS is now configured with "chat-" prefix
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
