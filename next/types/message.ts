export interface Message {
  id: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp: Date | FirebaseFirestore.Timestamp
  userId?: string // Firebase Auth UID of the user (optional for anonymous users)
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
  error?: boolean
}
