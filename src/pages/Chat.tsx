import { Link } from 'react-router-dom'

export default function Chat() {
  return (
    <div className="chat-widget-root chat-min-h-screen chat-bg-gray-100">
      {/* Navigation */}
      <nav className="chat-bg-white chat-shadow-sm chat-border-b chat-border-gray-200">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-flex chat-justify-between chat-h-16">
            <div className="chat-flex chat-items-center chat-space-x-4">
              <Link 
                to="/" 
                className="chat-text-lg chat-font-bold chat-text-gray-900 hover:chat-text-primary-600"
              >
                ← WooCommerce Talk AI
              </Link>
            </div>
            <div className="chat-flex chat-items-center">
              <span className="chat-text-sm chat-text-gray-600">
                Live Chat Demo
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="chat-flex chat-flex-col chat-h-screen chat-pt-16">
        <div className="chat-flex-1 chat-flex chat-justify-center chat-items-center chat-p-4">
          <div className="chat-w-full chat-max-w-2xl chat-bg-white chat-rounded-lg chat-shadow-lg chat-overflow-hidden">
            
            {/* Chat Header */}
            <div className="chat-bg-primary-500 chat-text-white chat-p-4">
              <div className="chat-flex chat-items-center chat-space-x-3">
                <div className="chat-w-8 chat-h-8 chat-bg-white chat-rounded-full chat-flex chat-items-center chat-justify-center">
                  <span className="chat-text-primary-500 chat-font-bold">AI</span>
                </div>
                <div>
                  <h3 className="chat-font-semibold">WooCommerce Assistant</h3>
                  <p className="chat-text-sm chat-opacity-90">Online - Ready to help!</p>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="chat-h-96 chat-p-4 chat-overflow-y-auto chat-space-y-4">
              
              {/* Welcome Message */}
              <div className="chat-flex chat-space-x-3">
                <div className="chat-w-8 chat-h-8 chat-bg-primary-500 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0">
                  <span className="chat-text-white chat-text-sm chat-font-bold">AI</span>
                </div>
                <div className="chat-message-bot">
                  <p>👋 Welcome! I'm your WooCommerce AI assistant. I can help you with:</p>
                  <ul className="chat-mt-2 chat-text-sm chat-space-y-1">
                    <li>• Product recommendations</li>
                    <li>• Order assistance</li>
                    <li>• Technical support</li>
                    <li>• Store information</li>
                  </ul>
                  <p className="chat-mt-2">How can I help you today?</p>
                </div>
              </div>

              {/* Demo Features Showcase */}
              <div className="chat-border-t chat-border-gray-200 chat-pt-4">
                <div className="chat-text-center chat-text-sm chat-text-gray-600 chat-mb-4">
                  Demo Features Preview
                </div>
                
                {/* Text Message Example */}
                <div className="chat-flex chat-justify-end chat-mb-4">
                  <div className="chat-message-user">
                    Show me some products
                  </div>
                </div>

                {/* Product Suggestion Card Example */}
                <div className="chat-flex chat-space-x-3 chat-mb-4">
                  <div className="chat-w-8 chat-h-8 chat-bg-primary-500 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0">
                    <span className="chat-text-white chat-text-sm chat-font-bold">AI</span>
                  </div>
                  <div className="chat-max-w-xs">
                    <div className="chat-bg-white chat-border chat-border-gray-200 chat-rounded-lg chat-overflow-hidden chat-shadow-sm">
                      <div className="chat-h-32 chat-bg-gray-200 chat-flex chat-items-center chat-justify-center">
                        <span className="chat-text-gray-500">📱 Product Image</span>
                      </div>
                      <div className="chat-p-3">
                        <h4 className="chat-font-semibold chat-text-sm">Wireless Headphones</h4>
                        <p className="chat-text-primary-600 chat-font-bold chat-text-sm">$89.99</p>
                        <button className="chat-mt-2 chat-w-full chat-bg-primary-500 chat-text-white chat-text-xs chat-py-1 chat-px-2 chat-rounded">
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Message Example */}
                <div className="chat-flex chat-justify-end chat-mb-4">
                  <div className="chat-message-user">
                    <div className="chat-flex chat-items-center chat-space-x-2">
                      <span>🎵</span>
                      <div className="chat-bg-white chat-bg-opacity-20 chat-rounded chat-px-2 chat-py-1">
                        <span className="chat-text-xs">Voice message 0:15</span>
                      </div>
                      <button className="chat-text-white chat-opacity-80 hover:chat-opacity-100">
                        ▶️
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Message Example */}
                <div className="chat-flex chat-space-x-3 chat-mb-4">
                  <div className="chat-w-8 chat-h-8 chat-bg-primary-500 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0">
                    <span className="chat-text-white chat-text-sm chat-font-bold">AI</span>
                  </div>
                  <div className="chat-message-bot">
                    <div className="chat-bg-gray-200 chat-rounded chat-h-24 chat-w-32 chat-flex chat-items-center chat-justify-center chat-mb-2">
                      <span className="chat-text-gray-500 chat-text-sm">🖼️ Image</span>
                    </div>
                    <p className="chat-text-sm">Here's our store layout guide</p>
                  </div>
                </div>

                {/* Typing Indicator Example */}
                <div className="chat-flex chat-space-x-3">
                  <div className="chat-w-8 chat-h-8 chat-bg-primary-500 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0">
                    <span className="chat-text-white chat-text-sm chat-font-bold">AI</span>
                  </div>
                  <div className="chat-bg-gray-200 chat-rounded-lg chat-px-4 chat-py-2">
                    <div className="chat-flex chat-space-x-1">
                      <div className="chat-w-2 chat-h-2 chat-bg-gray-500 chat-rounded-full chat-animate-pulse"></div>
                      <div className="chat-w-2 chat-h-2 chat-bg-gray-500 chat-rounded-full chat-animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="chat-w-2 chat-h-2 chat-bg-gray-500 chat-rounded-full chat-animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="chat-border-t chat-border-gray-200 chat-p-4">
              <div className="chat-flex chat-space-x-2">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="chat-input chat-flex-1"
                  disabled
                />
                <button className="chat-button-primary" disabled>
                  Send
                </button>
              </div>
              <div className="chat-mt-2 chat-flex chat-justify-center chat-space-x-4">
                <button className="chat-text-sm chat-text-gray-500 hover:chat-text-gray-700" disabled>
                  📎 Attach
                </button>
                <button className="chat-text-sm chat-text-gray-500 hover:chat-text-gray-700" disabled>
                  🎤 Voice
                </button>
                <button className="chat-text-sm chat-text-gray-500 hover:chat-text-gray-700" disabled>
                  🛒 Products
                </button>
              </div>
              <p className="chat-text-xs chat-text-gray-500 chat-text-center chat-mt-2">
                This is a demo interface. Interactive features coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}