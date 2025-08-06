// Type definitions for Firebase Firestore operations

import { FirebaseMessage, ConversationMetadata } from './types'

export declare function sendMessage(sessionId: string, messageData: Partial<FirebaseMessage>): Promise<void>

export declare function subscribeToMessages(
  sessionId: string, 
  callback: (messages: FirebaseMessage[]) => void
): () => void

export declare function updateConversation(
  sessionId: string, 
  data: ConversationMetadata
): Promise<void>