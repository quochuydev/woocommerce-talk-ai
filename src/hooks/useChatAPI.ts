import { useState, useEffect, useRef, useCallback } from 'react'

export interface Message {
  id: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  duration?: number
  fileUrl?: string
  fileName?: string
  fileSize?: number
  product?: {
    id: string
    title: string
    price: string
    image: string
    rating: number
    reviews: number
    url: string
  }
}

interface UseChatAPIOptions {
  sessionId?: string
  onError?: (error: Error) => void
  persistSession?: boolean
  storageKey?: string
  pollInterval?: number // Polling interval in ms (default: 3000)
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const useChatAPI = (options: UseChatAPIOptions = {}) => {
  const {
    sessionId: providedSessionId,
    onError,
    persistSession = true,
    storageKey = 'talkai-session-id',
    pollInterval = 3000, // Poll every 3 seconds
  } = options

  // Get or create session ID with localStorage persistence
  const getSessionId = (): string => {
    if (providedSessionId) {
      if (persistSession) {
        try {
          localStorage.setItem(storageKey, providedSessionId)
        } catch (e) {
          console.warn('[useChatAPI] Failed to save session to localStorage:', e)
        }
      }
      return providedSessionId
    }

    // Try to restore from localStorage
    if (persistSession) {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          console.log('[useChatAPI] Restored session from localStorage:', stored)
          return stored
        }
      } catch (e) {
        console.warn('[useChatAPI] Failed to read from localStorage:', e)
      }
    }

    // Generate new session ID
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`

    if (persistSession) {
      try {
        localStorage.setItem(storageKey, newSessionId)
        console.log('[useChatAPI] Created and saved new session:', newSessionId)
      } catch (e) {
        console.warn('[useChatAPI] Failed to save new session to localStorage:', e)
      }
    }

    return newSessionId
  }

  const [sessionId] = useState(getSessionId)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const onErrorRef = useRef(onError)
  const pollIntervalRef = useRef<number | null>(null)

  // Update ref when onError changes
  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages?sessionId=${sessionId}&limit=100`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success && data.messages) {
        // Convert timestamp strings back to Date objects
        const parsedMessages = data.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(parsedMessages)
      }
      
      setIsLoading(false)
    } catch (error) {
      console.error('[useChatAPI] Failed to fetch messages:', error)
      setIsLoading(false)
      onErrorRef.current?.(error as Error)
    }
  }, [sessionId])

  // Poll for messages
  useEffect(() => {
    console.log('[useChatAPI] Setting up message polling for session:', sessionId)
    
    // Initial fetch
    fetchMessages()

    // Set up polling
    pollIntervalRef.current = window.setInterval(() => {
      fetchMessages()
    }, pollInterval)

    return () => {
      console.log('[useChatAPI] Cleaning up message polling')
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }
    }
  }, [sessionId, pollInterval, fetchMessages])

  // Send a message via API
  const sendMessage = async (messageData: Omit<Message, 'id' | 'timestamp'>): Promise<string | undefined> => {
    setIsSending(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: {
            ...messageData,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Immediately fetch messages to update UI
      await fetchMessages()
      
      return data.messageId
    } catch (error) {
      console.error('[useChatAPI] Failed to send message:', error)
      onErrorRef.current?.(error as Error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  // Send a text message
  const sendTextMessage = async (content: string): Promise<string | undefined> => {
    if (!content.trim()) return undefined

    return sendMessage({
      type: 'text',
      content: content.trim(),
      sender: 'user',
    })
  }

  // Send a voice message
  const sendVoiceMessage = async (duration: number, audioUrl?: string): Promise<void> => {
    if (duration < 0.5) return

    await sendMessage({
      type: 'voice',
      content: 'Voice message',
      sender: 'user',
      duration,
      fileUrl: audioUrl,
    })
  }

  // Send a file/image message
  const sendFileMessage = async (file: File, fileUrl: string): Promise<void> => {
    const isImage = file.type.startsWith('image/')

    await sendMessage({
      type: isImage ? 'image' : 'file',
      content: isImage ? 'Image' : 'File attachment',
      sender: 'user',
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
    })
  }

  // Send AI response
  const sendAIResponse = async (content: string): Promise<void> => {
    await sendMessage({
      type: 'text',
      content,
      sender: 'ai',
    })
  }

  // Send product recommendation
  const sendProductRecommendation = async (product: Message['product']): Promise<void> => {
    if (!product) return

    await sendMessage({
      type: 'product',
      content: 'Product recommendation',
      sender: 'ai',
      product,
    })
  }

  // Clear session
  const clearSession = (): void => {
    if (persistSession) {
      try {
        localStorage.removeItem(storageKey)
        console.log('[useChatAPI] Session cleared from localStorage')
      } catch (e) {
        console.warn('[useChatAPI] Failed to clear session from localStorage:', e)
      }
    }
  }

  // Refresh messages manually (useful after sending a message)
  const refreshMessages = async (): Promise<void> => {
    await fetchMessages()
  }

  return {
    sessionId,
    messages,
    isLoading,
    isSending,
    sendTextMessage,
    sendVoiceMessage,
    sendFileMessage,
    sendAIResponse,
    sendProductRecommendation,
    clearSession,
    refreshMessages,
  }
}
