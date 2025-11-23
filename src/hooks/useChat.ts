import { useState, useEffect, useRef } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, QueryDocumentSnapshot } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { db } from '../lib/firebase'

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

interface UseChatOptions {
  sessionId?: string
  onError?: (error: Error) => void
  persistSession?: boolean // Whether to persist session in localStorage (default: true)
  storageKey?: string // Custom localStorage key (default: 'talkai-session-id')
}

export const useChat = (options: UseChatOptions = {}) => {
  const { 
    sessionId: providedSessionId, 
    onError, 
    persistSession = true,
    storageKey = 'talkai-session-id'
  } = options
  
  // Get or create session ID with localStorage persistence
  const getSessionId = (): string => {
    if (providedSessionId) {
      // Use provided session ID
      if (persistSession) {
        try {
          localStorage.setItem(storageKey, providedSessionId)
        } catch (e) {
          console.warn('[useChat] Failed to save session to localStorage:', e)
        }
      }
      return providedSessionId
    }
    
    // Try to restore from localStorage
    if (persistSession) {
      try {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          console.log('[useChat] Restored session from localStorage:', stored)
          return stored
        }
      } catch (e) {
        console.warn('[useChat] Failed to read from localStorage:', e)
      }
    }
    
    // Generate new session ID
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`
    
    if (persistSession) {
      try {
        localStorage.setItem(storageKey, newSessionId)
        console.log('[useChat] Created and saved new session:', newSessionId)
      } catch (e) {
        console.warn('[useChat] Failed to save new session to localStorage:', e)
      }
    }
    
    return newSessionId
  }
  
  const [sessionId] = useState(getSessionId)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  
  // Use ref to store onError callback to avoid re-subscription
  const onErrorRef = useRef(onError)
  
  // Update ref when onError changes
  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  // Subscribe to messages in real-time (only depends on sessionId)
  useEffect(() => {
    console.log('[useChat] Setting up Firestore subscription for session:', sessionId)
    
    const messagesRef = collection(db, `sessions/${sessionId}/messages`)
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log('[useChat] Received snapshot with', snapshot.docs.length, 'messages')
        const newMessages: Message[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data()
          return {
            id: doc.id,
            type: data.type,
            content: data.content,
            sender: data.sender,
            timestamp: data.timestamp?.toDate() || new Date(),
            duration: data.duration,
            fileUrl: data.fileUrl,
            fileName: data.fileName,
            fileSize: data.fileSize,
            product: data.product,
          }
        })
        setMessages(newMessages)
        setIsLoading(false)
      },
      (error) => {
        console.error('[useChat] Firestore error:', error)
        setIsLoading(false)
        onErrorRef.current?.(error as Error)
      },
    )

    return () => {
      console.log('[useChat] Cleaning up Firestore subscription')
      unsubscribe()
    }
  }, [sessionId])

  // Send a text message
  const sendTextMessage = async (content: string): Promise<string | undefined> => {
    if (!content.trim()) return undefined

    setIsSending(true)
    try {
      const messagesRef = collection(db, `sessions/${sessionId}/messages`)
      const docRef = await addDoc(messagesRef, {
        type: 'text',
        content: content.trim(),
        sender: 'user',
        timestamp: Timestamp.now(),
      })
      return docRef.id
    } catch (error) {
      console.error('Error sending text message:', error)
      onError?.(error as Error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  // Send a voice message
  const sendVoiceMessage = async (duration: number, audioUrl?: string): Promise<void> => {
    if (duration < 0.5) return

    setIsSending(true)
    try {
      const messagesRef = collection(db, `sessions/${sessionId}/messages`)
      await addDoc(messagesRef, {
        type: 'voice',
        content: 'Voice message',
        sender: 'user',
        timestamp: Timestamp.now(),
        duration,
        fileUrl: audioUrl,
      })
    } catch (error) {
      console.error('Error sending voice message:', error)
      onError?.(error as Error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  // Send a file/image message
  const sendFileMessage = async (file: File, fileUrl: string): Promise<void> => {
    const isImage = file.type.startsWith('image/')

    setIsSending(true)
    try {
      const messagesRef = collection(db, `sessions/${sessionId}/messages`)
      await addDoc(messagesRef, {
        type: isImage ? 'image' : 'file',
        content: isImage ? 'Image' : 'File attachment',
        sender: 'user',
        timestamp: Timestamp.now(),
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
      })
    } catch (error) {
      console.error('Error sending file message:', error)
      onError?.(error as Error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  // Send AI response
  const sendAIResponse = async (content: string): Promise<void> => {
    setIsSending(true)
    try {
      const messagesRef = collection(db, `sessions/${sessionId}/messages`)
      await addDoc(messagesRef, {
        type: 'text',
        content,
        sender: 'ai',
        timestamp: Timestamp.now(),
      })
    } catch (error) {
      console.error('Error sending AI response:', error)
      onError?.(error as Error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  // Send product recommendation
  const sendProductRecommendation = async (product: Message['product']): Promise<void> => {
    if (!product) return

    setIsSending(true)
    try {
      const messagesRef = collection(db, `sessions/${sessionId}/messages`)
      await addDoc(messagesRef, {
        type: 'product',
        content: 'Product recommendation',
        sender: 'ai',
        timestamp: Timestamp.now(),
        product,
      })
    } catch (error) {
      console.error('Error sending product recommendation:', error)
      onError?.(error as Error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  // Clear session (useful for logout or starting fresh)
  const clearSession = (): void => {
    if (persistSession) {
      try {
        localStorage.removeItem(storageKey)
        console.log('[useChat] Session cleared from localStorage')
      } catch (e) {
        console.warn('[useChat] Failed to clear session from localStorage:', e)
      }
    }
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
  }
}
