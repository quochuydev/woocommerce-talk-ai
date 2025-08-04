import { Link } from 'react-router-dom'
import { useState } from 'react'

interface ChatProps {
  isWidget?: boolean
  onMinimize?: () => void
  onClose?: () => void
}

interface Message {
  id: string
  type: 'text' | 'voice'
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  duration?: number // for voice messages
}

export default function Chat({ isWidget = false, onMinimize, onClose }: ChatProps) {
  // Voice playback states (for demo voice message)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [voiceProgress, setVoiceProgress] = useState(0)
  const [voiceDuration] = useState(15) // Demo duration in seconds

  // Chat states
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

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

  const sendTextMessage = () => {
    if (!inputText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputText('')
    
    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: 'Thanks for your message! This is a demo response from the AI assistant.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 60) { // Max 60 seconds
          stopRecording()
          clearInterval(interval)
          return 60
        }
        return prev + 0.1
      })
    }, 100)
  }

  const stopRecording = () => {
    setIsRecording(false)
    
    if (recordingTime > 0.5) { // Minimum 0.5 seconds
      const voiceMessage: Message = {
        id: Date.now().toString(),
        type: 'voice',
        content: 'Voice message',
        sender: 'user',
        timestamp: new Date(),
        duration: Math.round(recordingTime * 10) / 10
      }
      
      setMessages(prev => [...prev, voiceMessage])
      
      // Simulate AI response
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: 'I received your voice message! This is a demo response.',
          sender: 'ai',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    }
    
    setRecordingTime(0)
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
            <div className="tw-h-96 tw-p-6 tw-overflow-y-auto tw-space-y-4">
              
              {/* Welcome Message - only show if no messages */}
              {messages.length === 0 && (
                <div className="tw-flex tw-space-x-4">
                  <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="tw-bg-gray-50 tw-rounded-2xl tw-rounded-tl-sm tw-px-4 tw-py-3 tw-max-w-xs tw-shadow-sm">
                    <p className="tw-text-gray-800">✨ Welcome! I'm your AI assistant. How can I help you today?</p>
                  </div>
                </div>
              )}

              {/* Dynamic Messages */}
              {messages.map((message) => (
                <div key={message.id} className={`tw-flex tw-space-x-4 ${message.sender === 'user' ? 'tw-justify-end' : ''}`}>
                  {message.sender === 'ai' && (
                    <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                      <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                      </svg>
                    </div>
                  )}
                  
                  <div className={`tw-max-w-xs ${message.sender === 'user' ? 'tw-order-first' : ''}`}>
                    {message.type === 'text' ? (
                      <div className={`tw-rounded-2xl tw-px-4 tw-py-3 tw-shadow-sm ${
                        message.sender === 'user' 
                          ? 'tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-rounded-tr-sm' 
                          : 'tw-bg-gray-50 tw-text-gray-800 tw-rounded-tl-sm'
                      }`}>
                        <p className="tw-text-sm">{message.content}</p>
                      </div>
                    ) : (
                      <div className="tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-rounded-2xl tw-rounded-tr-sm tw-px-4 tw-py-3 tw-shadow-lg">
                        <div className="tw-flex tw-items-center tw-space-x-3">
                          <div className="tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-bg-white tw-bg-opacity-20 tw-rounded-full">
                            <svg className="tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          
                          <div className="tw-flex tw-items-center tw-space-x-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className="tw-w-1 tw-h-2 tw-bg-white tw-rounded-full"
                              />
                            ))}
                          </div>
                          
                          <span className="tw-text-xs tw-font-medium">0:{String(message.duration || 0).padStart(2, '0')}</span>
                          <span>🎤</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* AI Typing Indicator */}
              {isTyping && (
                <div className="tw-flex tw-space-x-4">
                  <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-br tw-from-primary-500 tw-to-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-shadow-lg">
                    <svg className="tw-w-5 tw-h-5 tw-text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                  </div>
                  <div className="tw-bg-gray-50 tw-rounded-2xl tw-rounded-tl-sm tw-px-4 tw-py-3 tw-shadow-sm">
                    <div className="tw-flex tw-items-center tw-space-x-1">
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full tw-animate-pulse"></div>
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full tw-animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="tw-w-2 tw-h-2 tw-bg-primary-400 tw-rounded-full tw-animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Chat Input */}
            <div className="tw-border-t tw-border-gray-100 tw-p-6 tw-bg-gray-50">
              
              {/* Recording Indicator */}
              {isRecording && (
                <div className="tw-mb-4 tw-flex tw-items-center tw-justify-center tw-space-x-3 tw-bg-red-500 tw-text-white tw-rounded-2xl tw-px-4 tw-py-3">
                  <div className="tw-w-4 tw-h-4 tw-bg-white tw-rounded-full tw-animate-pulse"></div>
                  <span className="tw-text-sm tw-font-medium">
                    Recording... {Math.floor(recordingTime)}:{String(Math.floor((recordingTime % 1) * 10)).padStart(1, '0')}s
                  </span>
                  <button
                    onClick={stopRecording}
                    className="tw-px-3 tw-py-1 tw-bg-white tw-bg-opacity-20 tw-rounded-full tw-text-xs tw-font-medium hover:tw-bg-opacity-30 tw-transition-all"
                  >
                    Stop
                  </button>
                </div>
              )}

              <div className="tw-flex tw-space-x-3 tw-items-end">
                <div className="tw-flex-1">
                  <div className="tw-relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
                      placeholder="Type your message here..."
                      className="tw-w-full tw-bg-white tw-border tw-border-gray-200 tw-rounded-2xl tw-px-4 tw-py-3 tw-pr-12 tw-text-sm tw-outline-none focus:tw-border-primary-300 focus:tw-ring-2 focus:tw-ring-primary-100 tw-transition-all"
                      disabled={isRecording}
                    />
                    <button 
                      onClick={sendTextMessage}
                      disabled={!inputText.trim() || isRecording}
                      className="tw-absolute tw-right-2 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-p-2 tw-text-gray-400 hover:tw-text-primary-500 tw-transition-colors disabled:tw-opacity-50"
                    >
                      <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Voice Recording Button */}
                <button 
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  onTouchStart={startRecording}
                  onTouchEnd={stopRecording}
                  disabled={inputText.trim().length > 0}
                  className={`tw-px-4 tw-py-3 tw-rounded-2xl tw-text-sm tw-font-medium tw-transition-all tw-shadow-sm tw-flex tw-items-center tw-space-x-2 disabled:tw-opacity-50 ${
                    isRecording 
                      ? 'tw-bg-red-500 tw-text-white' 
                      : 'tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white'
                  }`}
                  title={inputText.trim() ? "Clear text to send voice message" : "Hold to record voice message"}
                >
                  <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="tw-text-xs">
                    {isRecording ? 'Recording' : 'Hold'}
                  </span>
                </button>
              </div>
              
              <div className="tw-mt-4 tw-text-center">
                <p className="tw-text-xs tw-text-gray-500">
                  {isRecording 
                    ? "Release to send voice message" 
                    : "Type a message or hold the voice button to record"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}