import { Message } from '@/types/message'
import { Firestore, Timestamp } from 'firebase-admin/firestore'

export async function getConversationHistory(
  db: Firestore,
  sessionId: string,
  limit: number = 10
): Promise<Message[]> {
  const messagesRef = db.collection(`sessions/${sessionId}/messages`)
  const snapshot = await messagesRef
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()

  const messages: Message[] = []
  snapshot.forEach((doc) => {
    const data = doc.data()
    messages.push({
      id: doc.id,
      ...data,
      timestamp: data.timestamp.toDate(),
    } as Message)
  })

  return messages.reverse()
}

export async function saveMessage(
  db: Firestore,
  sessionId: string,
  message: Omit<Message, 'id'>
): Promise<string> {
  const messagesRef = db.collection(`sessions/${sessionId}/messages`)
  const docRef = await messagesRef.add({
    ...message,
    timestamp: Timestamp.now(),
  })
  return docRef.id
}
