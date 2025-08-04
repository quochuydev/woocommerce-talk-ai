import { Link } from 'react-router-dom'
import { useState } from 'react'

interface ChatProps {
  isWidget?: boolean
  onMinimize?: () => void
  onClose?: () => void
}

export default function Chat({ isWidget = false, onMinimize, onClose }: ChatProps) {
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [voiceProgress, setVoiceProgress] = useState(0)
  const [voiceDuration] = useState(15) // Demo duration in seconds

  const toggleVoicePlayback = () => {
    setIsVoicePlaying(!isVoicePlaying)
    
    if (!isVoicePlaying) {
      // Simulate playback progress
      const interval = setInterval(() => {
        setVoiceProgress(prev => {
          if (prev >= voiceDuration) {
            setIsVoicePlaying(false)
            clearInterval(interval)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    } else {
      setVoiceProgress(0)
    }
  }
  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize()
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }
  return (
    <div className="widget-root tw-min-h-screen">
      {/* Navigation - only show when not in widget mode */}
      {!isWidget && (
        <nav className="tw-bg-white tw-shadow-sm tw-border-b tw-border-gray-100">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
          <div className="tw-flex tw-justify-between tw-h-16">
            <div className="tw-flex tw-items-center tw-space-x-4">
              <Link 
                to="/" 
                className="tw-flex tw-items-center tw-space-x-3 tw-text-gray-900 hover:tw-text-primary-600 tw-transition-colors"
              >
                <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <div className="tw-w-8 tw-h-8 tw-bg-primary-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                  <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </div>
                <span className="tw-text-lg tw-font-bold">TalkAI</span>
              </Link>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-4">
              <div className="tw-flex tw-items-center tw-space-x-2">
                <div className="tw-w-2 tw-h-2 tw-bg-green-500 tw-rounded-full tw-animate-pulse-slow"></div>
                <span className="tw-text-sm tw-text-gray-600">Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      )}

      {/* Chat Interface */}
      <div className={`tw-flex tw-flex-col tw-h-screen ${isWidget ? 'tw-pt-0' : 'tw-pt-16'}`}>
        <div className="tw-flex-1 tw-flex tw-justify-center tw-items-center tw-p-6">
          <div className="tw-w-full tw-max-w-2xl tw-bg-white tw-rounded-2xl tw-shadow-2xl tw-overflow-hidden tw-border tw-border-gray-100">
            
            {/* Chat Header */}
            <div className="tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-p-4">
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center tw-space-x-3">
                  <div className="tw-relative">
                    <div className="tw-w-10 tw-h-10 tw-bg-white tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg">
                      <svg className="tw-w-5 tw-h-5 tw-text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                      </svg>
                    </div>
                    <div className="tw-absolute tw--bottom-1 tw--right-1 tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full tw-border-2 tw-border-white"></div>
                  </div>
                  <div>
                    <h3 className="tw-m-0 tw-text-base tw-font-semibold">TalkAI Assistant</h3>
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <div className="tw-w-2 tw-h-2 tw-bg-green-400 tw-rounded-full tw-animate-pulse"></div>
                      <p className="tw-m-0 tw-text-xs tw-opacity-90">Online</p>
                    </div>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="tw-flex tw-items-center tw-space-x-1">
                  <button 
                    onClick={handleMinimize}
                    className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-white tw-bg-opacity-20 hover:tw-bg-opacity-30 tw-transition-all tw-duration-200 tw-flex tw-items-center tw-justify-center"
                    title="Minimize chat"
                  >
                    <svg className="tw-w-3 tw-h-3 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleClose}
                    className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-white tw-bg-opacity-20 hover:tw-bg-opacity-30 tw-transition-all tw-duration-200 tw-flex tw-items-center tw-justify-center"
                    title="Close chat"
                  >
                    <svg className="tw-w-3 tw-h-3 tw-text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            {(
            <div className="tw-h-96 tw-p-6 tw-overflow-y-auto tw-space-y-6">
              
              {/* Welcome Message */}
              <div className="tw-flex tw-space-x-4">
                <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                  <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </div>
                <div className="tw-bg-light tw-rounded-2xl tw-rounded-tl-sm tw-px-4 tw-py-3 tw-max-w-xs tw-shadow-sm">
                  <p className="tw-text-gray-800">✨ Welcome! I'm your AI assistant. I can help you with:</p>
                  <div className="tw-mt-3 tw-space-y-2">
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full"></div>
                      <span className="tw-text-sm tw-text-gray-700">Product recommendations</span>
                    </div>
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full"></div>
                      <span className="tw-text-sm tw-text-gray-700">Order assistance</span>
                    </div>
                    <div className="tw-flex tw-items-center tw-space-x-2">
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full"></div>
                      <span className="tw-text-sm tw-text-gray-700">Technical support</span>
                    </div>
                  </div>
                  <p className="tw-mt-3 tw-text-gray-800 tw-font-medium">How can I help you today? 😊</p>
                </div>
              </div>

              {/* Demo Features Showcase */}
              <div className="tw-border-t tw-border-gray-100 tw-pt-6">
                <div className="tw-text-center tw-text-xs tw-text-gray-500 tw-mb-6 tw-bg-gray-50 tw-rounded-full tw-px-3 tw-py-1 tw-mx-auto tw-w-fit">
                  ✨ Interactive Demo Features
                </div>
                
                {/* Text Message Example */}
                <div className="tw-flex tw-justify-end tw-mb-6">
                  <div className="tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-rounded-2xl tw-rounded-tr-sm tw-px-4 tw-py-3 tw-max-w-xs tw-shadow-lg">
                    <p>Show me some products 🛍️</p>
                  </div>
                </div>

                {/* Product Suggestion Card Example */}
                <div className="tw-flex tw-space-x-4 tw-mb-6">
                  <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="tw-max-w-xs">
                    <div className="tw-bg-white tw-border tw-border-gray-100 tw-rounded-2xl tw-overflow-hidden tw-shadow-lg">
                      <div className="tw-h-32 tw-bg-gradient-to-br tw-from-primary-50 tw-to-primary-100 tw-flex tw-items-center tw-justify-center">
                        <div className="tw-text-center">
                          <div className="tw-w-12 tw-h-12 tw-bg-white tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-md tw-mx-auto">
                            <span className="tw-text-2xl">🎧</span>
                          </div>
                        </div>
                      </div>
                      <div className="tw-p-4">
                        <h4 className="tw-font-semibold tw-text-gray-900">Wireless Headphones</h4>
                        <p className="tw-text-primary-600 tw-font-bold tw-text-lg tw-mt-1">$89.99</p>
                        <div className="tw-flex tw-items-center tw-mt-2 tw-text-sm tw-text-gray-600">
                          <svg className="tw-w-4 tw-h-4 tw-text-yellow-400 tw-mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span>4.8 (2.1k reviews)</span>
                        </div>
                        <button className="tw-mt-3 tw-w-full tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white tw-text-sm tw-py-2 tw-px-3 tw-rounded-lg tw-font-medium tw-transition-colors tw-shadow-sm">
                          View Product →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voice Message Example */}
                <div className="tw-flex tw-justify-end tw-mb-6">
                  <div className="tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-rounded-2xl tw-rounded-tr-sm tw-px-4 tw-py-3 tw-max-w-xs tw-shadow-lg">
                    <div className="tw-flex tw-items-center tw-space-x-3">
                      <button 
                        onClick={toggleVoicePlayback}
                        className="tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-bg-white tw-bg-opacity-20 tw-rounded-full hover:tw-bg-opacity-30 tw-transition-all tw-duration-200"
                      >
                        {isVoicePlaying ? (
                          <svg className="tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      
                      {/* Animated Waveform */}
                      <div className="tw-flex tw-items-center tw-space-x-1">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`tw-w-1 tw-bg-white tw-rounded-full tw-transition-all tw-duration-200 ${
                              isVoicePlaying 
                                ? 'tw-animate-pulse tw-h-4' 
                                : 'tw-h-2'
                            }`}
                            style={{
                              animationDelay: `${i * 0.1}s`,
                              height: isVoicePlaying 
                                ? `${Math.sin((voiceProgress + i) * 0.5) * 8 + 12}px`
                                : '8px'
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="tw-flex tw-items-center tw-space-x-2">
                        <span className="tw-text-xs tw-font-medium">
                          {Math.floor(voiceProgress)}:{String(Math.floor((voiceProgress % 1) * 60)).padStart(2, '0')}
                        </span>
                        <span className="tw-text-xs tw-opacity-75">/ 0:15</span>
                      </div>
                      <span>🎤</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="tw-mt-2 tw-w-full tw-h-1 tw-bg-white tw-bg-opacity-20 tw-rounded-full tw-overflow-hidden">
                      <div 
                        className="tw-h-full tw-bg-white tw-rounded-full tw-transition-all tw-duration-100"
                        style={{ width: `${(voiceProgress / voiceDuration) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Image Message Example */}
                <div className="tw-flex tw-space-x-4 tw-mb-6">
                  <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="tw-bg-light tw-rounded-2xl tw-rounded-tl-sm tw-px-4 tw-py-3 tw-max-w-xs tw-shadow-sm">
                    <div className="tw-bg-gradient-to-br tw-from-gray-50 tw-to-gray-100 tw-rounded-xl tw-h-24 tw-w-32 tw-flex tw-items-center tw-justify-center tw-mb-3 tw-shadow-sm">
                      <div className="tw-text-center">
                        <div className="tw-w-8 tw-h-8 tw-bg-white tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-shadow-sm tw-mx-auto">
                          <span className="tw-text-lg">📋</span>
                        </div>
                      </div>
                    </div>
                    <p className="tw-text-sm tw-text-gray-800">Here's our store layout guide for better navigation 📍</p>
                  </div>
                </div>

                {/* Typing Indicator Example */}
                <div className="tw-flex tw-space-x-4">
                  <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="tw-bg-light tw-rounded-2xl tw-rounded-tl-sm tw-px-4 tw-py-3 tw-shadow-sm">
                    <div className="tw-flex tw-items-center tw-space-x-1">
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full tw-animate-pulse"></div>
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full tw-animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full tw-animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Chat Input */}
            {(
            <div className="tw-border-t tw-border-gray-100 tw-p-6 tw-bg-gray-50">
              <div className="tw-flex tw-space-x-3 tw-items-end">
                <div className="tw-flex-1">
                  <div className="tw-relative">
                    <input
                      type="text"
                      placeholder="Type your message here..."
                      className="tw-w-full tw-bg-white tw-border tw-border-gray-200 tw-rounded-2xl tw-px-4 tw-py-3 tw-pr-12 tw-text-sm tw-outline-none focus:tw-border-primary-300 focus:tw-ring-2 focus:tw-ring-primary-100 tw-transition-all"
                      disabled
                    />
                    <button className="tw-absolute tw-right-2 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-p-2 tw-text-gray-400 hover:tw-text-primary-500 tw-transition-colors" disabled>
                      <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button 
                  className="tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-gray-400 hover:tw-text-white tw-px-4 tw-py-3 tw-rounded-2xl tw-text-sm tw-font-medium tw-transition-colors tw-shadow-sm" 
                  disabled
                >
                  <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              <div className="tw-mt-3 tw-flex tw-justify-center tw-space-x-4">
                <button className="tw-p-2 tw-text-gray-400 hover:tw-text-primary-500 tw-transition-colors tw-rounded-lg hover:tw-bg-gray-100" disabled>
                  <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="tw-p-2 tw-text-gray-400 hover:tw-text-primary-500 tw-transition-colors tw-rounded-lg hover:tw-bg-gray-100" disabled>
                  <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="tw-p-2 tw-text-gray-400 hover:tw-text-primary-500 tw-transition-colors tw-rounded-lg hover:tw-bg-gray-100" disabled>
                  <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
              
              <div className="tw-mt-4 tw-text-center">
                <p className="tw-text-xs tw-text-gray-500 tw-bg-white tw-rounded-full tw-px-3 tw-py-1 tw-inline-block tw-shadow-sm">
                  ✨ This is a demo interface - Interactive features coming soon!
                </p>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}