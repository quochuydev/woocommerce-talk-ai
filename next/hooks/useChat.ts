'use client'

import { useState, useEffect, useRef } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, QueryDocumentSnapshot } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { db } from '@/lib/firebase'

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
  persistSession?: boolean
  storageKey?: string
}

export const useChat = (options: UseChatOptions = {}) => {
  const { 
    sessionId: providedSessionId, 
    onError, 
    persistSession = true,
    storageKey = 'talkai-session-id'
  } = options
  
  const getSessionId = (): string => {
    // Check if we're in the browser
    const isBrowser = typeof window !== 'undefined'
    
    if (providedSessionId) {
      if (persistSession && isBrowser) {
        try {
          localStorage.setItem(storageKey, providedSessionId)
        } catch (e) {
          console.warn('[useChat] Failed to save session to localStorage:', e)
        }
      }
      return providedSessionId
    }
    
    if (persistSession && isBrowser) {
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
    
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`
    
    if (persistSession && isBrowser) {
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
  
  const onErrorRef = useRef(onError)
  
  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

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

  const clearSession = (): void => {
    if (persistSession && typeof window !== 'undefined') {
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
