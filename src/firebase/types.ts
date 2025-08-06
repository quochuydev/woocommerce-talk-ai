// Firebase types for the chat system

export interface FirebaseMessage {
  id?: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp?: any // Firebase timestamp
  storedAt?: string
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

export interface ConversationMetadata {
  createdAt?: Date
  isWidget?: boolean
  userAgent?: string
  url?: string
  lastUpdated?: any // Firebase timestamp
  updatedAt?: string
}