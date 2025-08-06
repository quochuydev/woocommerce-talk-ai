import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { sendMessage, subscribeToMessages, updateConversation } from '../firebase/firestore'
import type { FirebaseMessage } from '../firebase/types'
import { v4 as uuidv4 } from 'uuid'

interface ChatProps {
  isWidget?: boolean
  onMinimize?: () => void
  onClose?: () => void
}

interface Message {
  id: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  duration?: number // for voice messages
  fileUrl?: string // for file/image messages
  fileName?: string // for file messages
  fileSize?: number // for file messages
  product?: {
    id: string
    title: string
    price: string
    image: string
    rating: number
    reviews: number
    url: string
  } // for product recommendation messages
}

export default function Chat({ isWidget = false, onMinimize, onClose }: ChatProps) {
  // Chat states
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [sessionId] = useState(() => uuidv4())

  // Enhanced logging utility
  const log = (level: 'info' | 'warn' | 'error', message: string, data?: any) => {
    const timestamp = new Date().toISOString()
    const logMessage = `[TalkAI-${level.toUpperCase()}] ${timestamp} - ${message}`
    
    console.group(logMessage)
    if (data) {
      console.log('Data:', data)
    }
    console.log('Session ID:', sessionId)
    console.log('Widget Mode:', isWidget)
    console.trace('Stack trace')
    console.groupEnd()
    
    // Also log to console in a simplified way for production debugging
    if (level === 'error') {
      console.error(logMessage, data)
    } else if (level === 'warn') {
      console.warn(logMessage, data)
    } else {
      console.log(logMessage, data)
    }
  }

  // Initialize Firebase listeners
  useEffect(() => {
    log('info', 'Initializing chat session')
    
    // Subscribe to messages
    const unsubscribe = subscribeToMessages(sessionId, (firebaseMessages: FirebaseMessage[]) => {
      log('info', 'Received messages from Firebase', { count: firebaseMessages.length })
      // Convert Firebase messages to local Message format
      const convertedMessages: Message[] = firebaseMessages.map(msg => ({
        ...msg,
        id: msg.id || Date.now().toString(), // Ensure id is never undefined
        timestamp: msg.timestamp || new Date()
      }))
      setMessages(convertedMessages)
    })

    // Initialize conversation metadata
    updateConversation(sessionId, {
      createdAt: new Date(),
      isWidget,
      userAgent: navigator.userAgent,
      url: window.location.href
    }).catch((error: any) => {
      log('error', 'Failed to initialize conversation', error)
    })

    return () => {
      log('info', 'Cleaning up chat session')
      unsubscribe()
    }
  }, [sessionId, isWidget])

  const sendTextMessage = async () => {
    if (!inputText.trim()) {
      log('warn', 'Attempted to send empty message')
      return
    }

    const messageContent = inputText.trim()
    log('info', 'Sending text message', { content: messageContent, length: messageContent.length })
    
    setInputText('')

    try {
      // Send user message to Firebase
      const userMessageData = {
        type: 'text' as const,
        content: messageContent,
        sender: 'user' as const
      }
      
      log('info', 'Saving user message to Firebase', userMessageData)
      await sendMessage(sessionId, userMessageData)
      log('info', 'User message saved successfully')
      
      // Simulate AI response (only for text messages)
      setIsTyping(true)
      log('info', 'Starting AI response simulation')
      
      setTimeout(async () => {
        try {
          const aiResponseData = {
            type: 'text' as const,
            content: 'Thanks for your message! This is a demo response from the AI assistant.',
            sender: 'ai' as const
          }
          
          log('info', 'Saving AI response to Firebase', aiResponseData)
          await sendMessage(sessionId, aiResponseData)
          log('info', 'AI response saved successfully')
          
        } catch (error) {
          log('error', 'Failed to save AI response', error)
        } finally {
          setIsTyping(false)
        }
      }, 1500)
      
    } catch (error) {
      log('error', 'Failed to send text message', error)
      setIsTyping(false)
      
      // Show error message to user
      alert('Failed to send message. Please try again.')
    }
  }

  const startRecording = () => {
    log('info', 'Starting voice recording')
    setIsRecording(true)
    setRecordingTime(0)
    
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 60) { // Max 60 seconds
          log('warn', 'Recording reached maximum duration', { duration: prev })
          stopRecording()
          clearInterval(interval)
          return 60
        }
        return prev + 0.1
      })
    }, 100)
  }

  const stopRecording = () => {
    const duration = Math.round(recordingTime * 10) / 10
    log('info', 'Stopping voice recording', { duration, minDuration: 0.5 })
    setIsRecording(false)
    
    if (recordingTime > 0.5) { // Minimum 0.5 seconds
      log('info', 'Voice recording valid, creating message', { duration })
      const voiceMessage: Message = {
        id: Date.now().toString(),
        type: 'voice',
        content: 'Voice message',
        sender: 'user',
        timestamp: new Date(),
        duration
      }
      
      // Note: Voice messages are NOT stored in Firebase yet
      log('warn', 'Voice message created but NOT stored in Firebase (implementation pending)', voiceMessage)
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
        log('warn', 'AI response to voice message created but NOT stored in Firebase', aiResponse)
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    } else {
      log('warn', 'Voice recording too short, discarding', { duration })
    }
    
    setRecordingTime(0)
  }

  const handleFileUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const fileUrl = URL.createObjectURL(file)
    
    log('info', 'File uploaded', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type, 
      isImage 
    })
    
    const fileMessage: Message = {
      id: Date.now().toString(),
      type: isImage ? 'image' : 'file',
      content: isImage ? 'Image' : 'File attachment',
      sender: 'user',
      timestamp: new Date(),
      fileUrl,
      fileName: file.name,
      fileSize: file.size
    }
    
    // Note: File messages are NOT stored in Firebase yet
    log('warn', 'File message created but NOT stored in Firebase (implementation pending)', fileMessage)
    setMessages(prev => [...prev, fileMessage])
    
    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      const responses = [
        "I can see the file you've shared! How can I help you with it?",
        "Thanks for sharing that image! What would you like to know about it?",
        "I've received your file. What would you like me to do with it?",
        "Nice! I can see your attachment. How can I assist you with this?"
      ]
      
      const selectedResponse = responses[Math.floor(Math.random() * responses.length)]
      log('info', 'Generated AI response to file upload', { response: selectedResponse })
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        content: selectedResponse,
        sender: 'ai',
        timestamp: new Date()
      }
      
      log('warn', 'AI response to file upload created but NOT stored in Firebase', aiResponse)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const sendProductRecommendation = () => {
    log('info', 'Sending demo product recommendation')
    
    // Demo product data
    const products = [
      {
        id: '1',
        title: 'Wireless Bluetooth Headphones',
        price: '$89.99',
        image: '🎧',
        rating: 4.8,
        reviews: 2156,
        url: '#'
      },
      {
        id: '2', 
        title: 'Smart Fitness Watch',
        price: '$199.99',
        image: '⌚',
        rating: 4.6,
        reviews: 1834,
        url: '#'
      },
      {
        id: '3',
        title: 'Portable Bluetooth Speaker',
        price: '$49.99',
        image: '🔊',
        rating: 4.7,
        reviews: 956,
        url: '#'
      }
    ]
    
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    log('info', 'Selected random product', randomProduct)
    
    const productMessage: Message = {
      id: Date.now().toString(),
      type: 'product',
      content: 'Product recommendation',
      sender: 'ai',
      timestamp: new Date(),
      product: randomProduct
    }
    
    // Note: Product messages are NOT stored in Firebase yet
    log('warn', 'Product message created but NOT stored in Firebase (implementation pending)', productMessage)
    setMessages(prev => [...prev, productMessage])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!dragOver) {
      log('info', 'File drag detected')
      setDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    log('info', 'Files dropped', { count: files.length, fileNames: files.map(f => f.name) })
    
    if (files.length > 0) {
      handleFileUpload(files[0])
    } else {
      log('warn', 'No files in drop event')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    log('info', 'File selected via input', { count: files?.length || 0 })
    
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    } else {
      log('warn', 'No files selected')
    }
    // Reset input
    e.target.value = ''
  }
  const handleMinimize = () => {
    log('info', 'Chat minimize requested')
    if (onMinimize) {
      onMinimize()
    }
  }

  const handleClose = () => {
    log('info', 'Chat close requested')
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
        <div className={`tw-flex-1 tw-flex tw-justify-center ${isWidget ? 'tw-items-end' : 'tw-items-center'} tw-p-6`}>
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
            <div 
              className={`tw-h-96 tw-p-6 tw-overflow-y-auto tw-space-y-4 tw-transition-all tw-duration-200 ${
                dragOver ? 'tw-bg-primary-50 tw-border-2 tw-border-dashed tw-border-primary-300' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              
              {/* Drag & Drop Indicator */}
              {dragOver && (
                <div className="tw-absolute tw-inset-6 tw-flex tw-items-center tw-justify-center tw-bg-primary-50 tw-bg-opacity-90 tw-rounded-2xl tw-z-10">
                  <div className="tw-text-center">
                    <svg className="tw-w-12 tw-h-12 tw-text-primary-500 tw-mx-auto tw-mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="tw-text-primary-600 tw-font-medium">Drop files here to upload</p>
                    <p className="tw-text-primary-500 tw-text-sm">Images and documents supported</p>
                  </div>
                </div>
              )}
              
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
                    {message.type === 'text' && (
                      <div className={`tw-rounded-2xl tw-px-4 tw-py-3 tw-shadow-sm ${
                        message.sender === 'user' 
                          ? 'tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-rounded-tr-sm' 
                          : 'tw-bg-gray-50 tw-text-gray-800 tw-rounded-tl-sm'
                      }`}>
                        <p className="tw-text-sm">{message.content}</p>
                      </div>
                    )}

                    {message.type === 'voice' && (
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

                    {message.type === 'image' && (
                      <div className={`tw-rounded-2xl tw-overflow-hidden tw-shadow-lg ${
                        message.sender === 'user' ? 'tw-rounded-tr-sm' : 'tw-rounded-tl-sm'
                      }`}>
                        <img 
                          src={message.fileUrl} 
                          alt={message.fileName}
                          className="tw-w-full tw-h-48 tw-object-cover"
                        />
                        <div className={`tw-px-3 tw-py-2 ${
                          message.sender === 'user' 
                            ? 'tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white' 
                            : 'tw-bg-gray-50 tw-text-gray-800'
                        }`}>
                          <p className="tw-text-xs tw-font-medium">{message.fileName}</p>
                        </div>
                      </div>
                    )}

                    {message.type === 'file' && (
                      <div className={`tw-rounded-2xl tw-px-4 tw-py-3 tw-shadow-sm tw-flex tw-items-center tw-space-x-3 ${
                        message.sender === 'user' 
                          ? 'tw-bg-gradient-to-r tw-from-primary-500 tw-to-primary-600 tw-text-white tw-rounded-tr-sm' 
                          : 'tw-bg-gray-50 tw-text-gray-800 tw-rounded-tl-sm'
                      }`}>
                        <div className={`tw-w-10 tw-h-10 tw-rounded-lg tw-flex tw-items-center tw-justify-center ${
                          message.sender === 'user' ? 'tw-bg-white tw-bg-opacity-20' : 'tw-bg-primary-100'
                        }`}>
                          <svg className={`tw-w-5 tw-h-5 ${message.sender === 'user' ? 'tw-text-white' : 'tw-text-primary-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="tw-flex-1 tw-min-w-0">
                          <p className="tw-text-sm tw-font-medium tw-truncate">{message.fileName}</p>
                          <p className={`tw-text-xs ${message.sender === 'user' ? 'tw-text-white tw-opacity-75' : 'tw-text-gray-500'}`}>
                            {message.fileSize ? `${Math.round(message.fileSize / 1024)} KB` : 'File'}
                          </p>
                        </div>
                      </div>
                    )}

                    {message.type === 'product' && message.product && (
                      <div className="tw-bg-white tw-border tw-border-gray-100 tw-rounded-2xl tw-rounded-tl-sm tw-overflow-hidden tw-shadow-lg tw-max-w-sm">
                        <div className="tw-h-32 tw-bg-gradient-to-br tw-from-primary-50 tw-to-primary-100 tw-flex tw-items-center tw-justify-center">
                          <div className="tw-text-center">
                            <div className="tw-w-12 tw-h-12 tw-bg-white tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-md tw-mx-auto">
                              <span className="tw-text-2xl">{message.product.image}</span>
                            </div>
                          </div>
                        </div>
                        <div className="tw-p-4">
                          <h4 className="tw-font-semibold tw-text-gray-900 tw-text-sm">{message.product.title}</h4>
                          <p className="tw-text-primary-600 tw-font-bold tw-text-lg tw-mt-1">{message.product.price}</p>
                          <div className="tw-flex tw-items-center tw-mt-2 tw-text-sm tw-text-gray-600">
                            <div className="tw-flex tw-items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i}
                                  className={`tw-w-4 tw-h-4 ${i < Math.floor(message.product!.rating) ? 'tw-text-yellow-400' : 'tw-text-gray-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                              ))}
                              <span className="tw-ml-1">{message.product.rating} ({message.product.reviews.toLocaleString()} reviews)</span>
                            </div>
                          </div>
                          <button className="tw-mt-3 tw-w-full tw-bg-primary-500 hover:tw-bg-primary-600 tw-text-white tw-text-sm tw-py-2 tw-px-3 tw-rounded-lg tw-font-medium tw-transition-colors tw-shadow-sm">
                            View Product →
                          </button>
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
                {/* File Upload Button */}
                <div className="tw-relative">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    className="tw-hidden"
                    id="file-upload"
                    disabled={isRecording}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-transition-all tw-cursor-pointer tw-shadow-sm ${
                      isRecording 
                        ? 'tw-bg-gray-300 tw-text-gray-500 tw-cursor-not-allowed' 
                        : 'tw-bg-gray-100 tw-text-gray-600 hover:tw-bg-gray-200 hover:tw-text-primary-500'
                    }`}
                    title="Upload file or image"
                  >
                    <svg className="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </label>
                </div>

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
              
              <div className="tw-mt-4 tw-flex tw-flex-col tw-items-center tw-space-y-2">
                <p className="tw-m-0 tw-text-xs tw-text-gray-500">
                  {isRecording 
                    ? "Release to send voice message" 
                    : "Type a message, upload files, or hold the voice button to record"
                  }
                </p>
                
                {/* Demo Product Recommendation Button */}
                {!isRecording && messages.length > 0 && (
                  <button
                    onClick={sendProductRecommendation}
                    className="tw-text-xs tw-text-primary-500 hover:tw-text-primary-600 tw-transition-colors tw-underline tw-decoration-dotted"
                  >
                    ✨ Send demo product recommendation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}