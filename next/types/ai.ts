import { Message } from './message'
import { Product } from './product'

export interface StoreInfo {
  name: string
  description: string
  hours?: string
  locations?: string[]
  policies?: {
    returns?: string
    shipping?: string
    [key: string]: string | undefined
  }
}

export interface AIRequest {
  conversationHistory: Message[]
  relevantProducts?: Product[]
  storeContext: StoreInfo
}

export interface AIResponse {
  content: string
  model: string
  tokensUsed?: number
}

export interface AIProvider {
  generateResponse(request: AIRequest): Promise<AIResponse>
}
