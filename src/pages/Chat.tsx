import { Link } from 'react-router-dom'

export default function Chat() {
  return (
    <div className="widget-root min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-gray-900 hover:text-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">TalkAI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                <span className="text-sm text-gray-600">Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="flex flex-col h-screen pt-16">
        <div className="flex-1 flex justify-center items-center p-6">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">TalkAI Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-sm opacity-90">Online & ready to help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="h-96 p-6 overflow-y-auto space-y-6">
              
              {/* Welcome Message */}
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </div>
                <div className="bg-light rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs shadow-sm">
                  <p className="text-gray-800">✨ Welcome! I'm your AI assistant. I can help you with:</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">Product recommendations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">Order assistance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">Technical support</span>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-800 font-medium">How can I help you today? 😊</p>
                </div>
              </div>

              {/* Demo Features Showcase */}
              <div className="border-t border-gray-100 pt-6">
                <div className="text-center text-xs text-gray-500 mb-6 bg-gray-50 rounded-full px-3 py-1 mx-auto w-fit">
                  ✨ Interactive Demo Features
                </div>
                
                {/* Text Message Example */}
                <div className="flex justify-end mb-6">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs shadow-lg">
                    <p>Show me some products 🛍️</p>
                  </div>
                </div>

                {/* Product Suggestion Card Example */}
                <div className="flex space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="max-w-xs">
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
                      <div className="h-32 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md mx-auto">
                            <span className="text-2xl">🎧</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900">Wireless Headphones</h4>
                        <p className="text-primary-600 font-bold text-lg mt-1">$89.99</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span>4.8 (2.1k reviews)</span>
                        </div>
                        <button className="mt-3 w-full bg-primary-500 hover:bg-primary-600 text-white text-sm py-2 px-3 rounded-lg font-medium transition-colors shadow-sm">
                          View Product →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Message Example */}
                <div className="flex justify-end mb-6">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span className="text-xs font-medium">0:15</span>
                      </div>
                      <span>🎵</span>
                    </div>
                  </div>
                </div>

                {/* Image Message Example */}
                <div className="flex space-x-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="bg-light rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs shadow-sm">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-24 w-32 flex items-center justify-center mb-3 shadow-sm">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm mx-auto">
                          <span className="text-lg">📋</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800">Here's our store layout guide for better navigation 📍</p>
                  </div>
                </div>

                {/* Typing Indicator Example */}
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="bg-light rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex space-x-3 items-end">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type your message here..."
                      className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
                      disabled
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-primary-500 transition-colors" disabled>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button 
                  className="bg-primary-500 hover:bg-primary-600 text-gray-400 hover:text-white px-4 py-3 rounded-2xl text-sm font-medium transition-colors shadow-sm" 
                  disabled
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-3 flex justify-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-lg hover:bg-gray-100" disabled>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-lg hover:bg-gray-100" disabled>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors rounded-lg hover:bg-gray-100" disabled>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 bg-white rounded-full px-3 py-1 inline-block shadow-sm">
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