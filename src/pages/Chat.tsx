import { Link } from 'react-router-dom'

export default function Chat() {
  return (
    <div className="chat-widget-root chat-min-h-screen chat-bg-gray-50">
      {/* Navigation */}
      <nav className="chat-bg-white chat-shadow-sm chat-border-b chat-border-gray-100">
        <div className="chat-max-w-7xl chat-mx-auto chat-px-4 chat-sm:px-6 chat-lg:px-8">
          <div className="chat-flex chat-justify-between chat-h-16">
            <div className="chat-flex chat-items-center chat-space-x-4">
              <Link 
                to="/" 
                className="chat-flex chat-items-center chat-space-x-3 chat-text-gray-900 hover:chat-text-primary-600 chat-transition-colors"
              >
                <svg className="chat-w-5 chat-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <div className="chat-w-8 chat-h-8 chat-bg-primary-500 chat-rounded-lg chat-flex chat-items-center chat-justify-center">
                  <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </div>
                <span className="chat-text-lg chat-font-bold">TalkAI</span>
              </Link>
            </div>
            <div className="chat-flex chat-items-center chat-space-x-4">
              <div className="chat-flex chat-items-center chat-space-x-2">
                <div className="chat-w-2 chat-h-2 chat-bg-green-500 chat-rounded-full chat-animate-pulse-slow"></div>
                <span className="chat-text-sm chat-text-gray-600">Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="chat-flex chat-flex-col chat-h-screen chat-pt-16">
        <div className="chat-flex-1 chat-flex chat-justify-center chat-items-center chat-p-6">
          <div className="chat-w-full chat-max-w-2xl chat-bg-white chat-rounded-2xl chat-shadow-2xl chat-overflow-hidden chat-border chat-border-gray-100">
            
            {/* Chat Header */}
            <div className="chat-bg-gradient-to-r chat-from-primary-500 chat-to-primary-600 chat-text-white chat-p-6">
              <div className="chat-flex chat-items-center chat-space-x-4">
                <div className="chat-relative">
                  <div className="chat-w-12 chat-h-12 chat-bg-white chat-rounded-full chat-flex chat-items-center chat-justify-center chat-shadow-lg">
                    <svg className="chat-w-6 chat-h-6 chat-text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="chat-absolute chat--bottom-1 chat--right-1 chat-w-4 chat-h-4 chat-bg-green-500 chat-rounded-full chat-border-2 chat-border-white"></div>
                </div>
                <div>
                  <h3 className="chat-text-lg chat-font-semibold">TalkAI Assistant</h3>
                  <div className="chat-flex chat-items-center chat-space-x-2">
                    <div className="chat-w-2 chat-h-2 chat-bg-green-400 chat-rounded-full chat-animate-pulse"></div>
                    <p className="chat-text-sm chat-opacity-90">Online & ready to help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="chat-h-96 chat-p-6 chat-overflow-y-auto chat-space-y-6">
              
              {/* Welcome Message */}
              <div className="chat-flex chat-space-x-4">
                <div className="chat-w-10 chat-h-10 chat-bg-gradient-to-br chat-from-primary-500 chat-to-primary-600 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0 chat-shadow-lg">
                  <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </div>
                <div className="chat-bg-chat-light chat-rounded-2xl chat-rounded-tl-sm chat-px-4 chat-py-3 chat-max-w-xs chat-shadow-sm">
                  <p className="chat-text-gray-800">✨ Welcome! I'm your AI assistant. I can help you with:</p>
                  <div className="chat-mt-3 chat-space-y-2">
                    <div className="chat-flex chat-items-center chat-space-x-2">
                      <div className="chat-w-2 chat-h-2 chat-bg-primary-400 chat-rounded-full"></div>
                      <span className="chat-text-sm chat-text-gray-700">Product recommendations</span>
                    </div>
                    <div className="chat-flex chat-items-center chat-space-x-2">
                      <div className="chat-w-2 chat-h-2 chat-bg-primary-400 chat-rounded-full"></div>
                      <span className="chat-text-sm chat-text-gray-700">Order assistance</span>
                    </div>
                    <div className="chat-flex chat-items-center chat-space-x-2">
                      <div className="chat-w-2 chat-h-2 chat-bg-primary-400 chat-rounded-full"></div>
                      <span className="chat-text-sm chat-text-gray-700">Technical support</span>
                    </div>
                  </div>
                  <p className="chat-mt-3 chat-text-gray-800 chat-font-medium">How can I help you today? 😊</p>
                </div>
              </div>

              {/* Demo Features Showcase */}
              <div className="chat-border-t chat-border-gray-100 chat-pt-6">
                <div className="chat-text-center chat-text-xs chat-text-gray-500 chat-mb-6 chat-bg-gray-50 chat-rounded-full chat-px-3 chat-py-1 chat-mx-auto chat-w-fit">
                  ✨ Interactive Demo Features
                </div>
                
                {/* Text Message Example */}
                <div className="chat-flex chat-justify-end chat-mb-6">
                  <div className="chat-bg-gradient-to-r chat-from-primary-500 chat-to-primary-600 chat-text-white chat-rounded-2xl chat-rounded-tr-sm chat-px-4 chat-py-3 chat-max-w-xs chat-shadow-lg">
                    <p>Show me some products 🛍️</p>
                  </div>
                </div>

                {/* Product Suggestion Card Example */}
                <div className="chat-flex chat-space-x-4 chat-mb-6">
                  <div className="chat-w-10 chat-h-10 chat-bg-gradient-to-br chat-from-primary-500 chat-to-primary-600 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0 chat-shadow-lg">
                    <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="chat-max-w-xs">
                    <div className="chat-bg-white chat-border chat-border-gray-100 chat-rounded-2xl chat-overflow-hidden chat-shadow-lg">
                      <div className="chat-h-32 chat-bg-gradient-to-br chat-from-primary-50 chat-to-primary-100 chat-flex chat-items-center chat-justify-center">
                        <div className="chat-text-center">
                          <div className="chat-w-12 chat-h-12 chat-bg-white chat-rounded-xl chat-flex chat-items-center chat-justify-center chat-shadow-md chat-mx-auto">
                            <span className="chat-text-2xl">🎧</span>
                          </div>
                        </div>
                      </div>
                      <div className="chat-p-4">
                        <h4 className="chat-font-semibold chat-text-gray-900">Wireless Headphones</h4>
                        <p className="chat-text-primary-600 chat-font-bold chat-text-lg chat-mt-1">$89.99</p>
                        <div className="chat-flex chat-items-center chat-mt-2 chat-text-sm chat-text-gray-600">
                          <svg className="chat-w-4 chat-h-4 chat-text-yellow-400 chat-mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span>4.8 (2.1k reviews)</span>
                        </div>
                        <button className="chat-mt-3 chat-w-full chat-bg-primary-500 hover:chat-bg-primary-600 chat-text-white chat-text-sm chat-py-2 chat-px-3 chat-rounded-lg chat-font-medium chat-transition-colors chat-shadow-sm">
                          View Product →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Message Example */}
                <div className="chat-flex chat-justify-end chat-mb-6">
                  <div className="chat-bg-gradient-to-r chat-from-primary-500 chat-to-primary-600 chat-text-white chat-rounded-2xl chat-rounded-tr-sm chat-px-4 chat-py-3 chat-max-w-xs chat-shadow-lg">
                    <div className="chat-flex chat-items-center chat-space-x-3">
                      <div className="chat-flex chat-items-center chat-space-x-2 chat-bg-white chat-bg-opacity-20 chat-rounded-full chat-px-3 chat-py-2">
                        <svg className="chat-w-4 chat-h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span className="chat-text-xs chat-font-medium">0:15</span>
                      </div>
                      <span>🎵</span>
                    </div>
                  </div>
                </div>

                {/* Image Message Example */}
                <div className="chat-flex chat-space-x-4 chat-mb-6">
                  <div className="chat-w-10 chat-h-10 chat-bg-gradient-to-br chat-from-primary-500 chat-to-primary-600 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0 chat-shadow-lg">
                    <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="chat-bg-chat-light chat-rounded-2xl chat-rounded-tl-sm chat-px-4 chat-py-3 chat-max-w-xs chat-shadow-sm">
                    <div className="chat-bg-gradient-to-br chat-from-gray-50 chat-to-gray-100 chat-rounded-xl chat-h-24 chat-w-32 chat-flex chat-items-center chat-justify-center chat-mb-3 chat-shadow-sm">
                      <div className="chat-text-center">
                        <div className="chat-w-8 chat-h-8 chat-bg-white chat-rounded-lg chat-flex chat-items-center chat-justify-center chat-shadow-sm chat-mx-auto">
                          <span className="chat-text-lg">📋</span>
                        </div>
                      </div>
                    </div>
                    <p className="chat-text-sm chat-text-gray-800">Here's our store layout guide for better navigation 📍</p>
                  </div>
                </div>

                {/* Typing Indicator Example */}
                <div className="chat-flex chat-space-x-4">
                  <div className="chat-w-10 chat-h-10 chat-bg-gradient-to-br chat-from-primary-500 chat-to-primary-600 chat-rounded-full chat-flex chat-items-center chat-justify-center chat-flex-shrink-0 chat-shadow-lg">
                    <svg className="chat-w-5 chat-h-5 chat-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="chat-bg-chat-light chat-rounded-2xl chat-rounded-tl-sm chat-px-4 chat-py-3 chat-shadow-sm">
                    <div className="chat-flex chat-items-center chat-space-x-1">
                      <div className="chat-w-2 chat-h-2 chat-bg-primary-400 chat-rounded-full chat-animate-pulse"></div>
                      <div className="chat-w-2 chat-h-2 chat-bg-primary-400 chat-rounded-full chat-animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="chat-w-2 chat-h-2 chat-bg-primary-400 chat-rounded-full chat-animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="chat-border-t chat-border-gray-100 chat-p-6 chat-bg-gray-50">
              <div className="chat-flex chat-space-x-3 chat-items-end">
                <div className="chat-flex-1">
                  <div className="chat-relative">
                    <input
                      type="text"
                      placeholder="Type your message here..."
                      className="chat-w-full chat-bg-white chat-border chat-border-gray-200 chat-rounded-2xl chat-px-4 chat-py-3 chat-pr-12 chat-text-sm chat-outline-none focus:chat-border-primary-300 focus:chat-ring-2 focus:chat-ring-primary-100 chat-transition-all"
                      disabled
                    />
                    <button className="chat-absolute chat-right-2 chat-top-1/2 chat-transform chat--translate-y-1/2 chat-p-2 chat-text-gray-400 hover:chat-text-primary-500 chat-transition-colors" disabled>
                      <svg className="chat-w-5 chat-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button 
                  className="chat-bg-primary-500 hover:chat-bg-primary-600 chat-text-white chat-px-4 chat-py-3 chat-rounded-2xl chat-text-sm chat-font-medium chat-transition-colors chat-shadow-sm" 
                  disabled
                >
                  <svg className="chat-w-5 chat-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <div className="chat-mt-3 chat-flex chat-justify-center chat-space-x-4">
                <button className="chat-p-2 chat-text-gray-400 hover:chat-text-primary-500 chat-transition-colors chat-rounded-lg hover:chat-bg-gray-100" disabled>
                  <svg className="chat-w-4 chat-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="chat-p-2 chat-text-gray-400 hover:chat-text-primary-500 chat-transition-colors chat-rounded-lg hover:chat-bg-gray-100" disabled>
                  <svg className="chat-w-4 chat-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="chat-p-2 chat-text-gray-400 hover:chat-text-primary-500 chat-transition-colors chat-rounded-lg hover:chat-bg-gray-100" disabled>
                  <svg className="chat-w-4 chat-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
              
              <div className="chat-mt-4 chat-text-center">
                <p className="chat-text-xs chat-text-gray-500 chat-bg-white chat-rounded-full chat-px-3 chat-py-1 chat-inline-block chat-shadow-sm">
                  ✨ This is a demo interface - Interactive features coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}