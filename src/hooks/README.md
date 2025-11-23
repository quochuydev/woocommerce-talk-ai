# useChat Hook

A React hook for managing chat functionality with Firebase Firestore integration.

## Features

- Real-time message synchronization
- Support for multiple message types (text, voice, file, image, product)
- Session-based message isolation
- Automatic timestamp management
- Error handling

## Installation

Make sure Firebase is installed:

```bash
npm install firebase
```

## Usage

### Basic Example (with localStorage persistence)

```tsx
import { useChat } from './hooks/useChat'

function ChatComponent() {
  const { 
    sessionId,
    messages, 
    isLoading, 
    sendTextMessage,
    clearSession 
  } = useChat({
    // sessionId is auto-restored from localStorage
    // or auto-generated if first visit
    onError: (error) => console.error('Chat error:', error),
    persistSession: true // default: true
  })

  const handleSend = async (text: string) => {
    try {
      await sendTextMessage(text)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleNewChat = () => {
    clearSession() // Clear localStorage and start fresh
    window.location.reload() // Reload to create new session
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div>Session: {sessionId}</div>
      <button onClick={handleNewChat}>Start New Chat</button>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender}:</strong> {msg.content}
        </div>
      ))}
    </div>
  )
}
```

### Advanced Example with All Message Types

```tsx
import { useChat } from './hooks/useChat'

function AdvancedChat() {
  const {
    messages,
    isLoading,
    isSending,
    sendTextMessage,
    sendVoiceMessage,
    sendFileMessage,
    sendAIResponse,
    sendProductRecommendation
  } = useChat({
    sessionId: 'session-456',
    onError: (error) => alert(`Error: ${error.message}`)
  })

  // Send text message
  const handleTextMessage = async (text: string) => {
    await sendTextMessage(text)
    
    // Simulate AI response
    setTimeout(() => {
      sendAIResponse('Thanks for your message!')
    }, 1000)
  }

  // Send voice message
  const handleVoiceMessage = async (duration: number, audioUrl: string) => {
    await sendVoiceMessage(duration, audioUrl)
  }

  // Send file/image
  const handleFileUpload = async (file: File) => {
    const fileUrl = URL.createObjectURL(file)
    await sendFileMessage(file, fileUrl)
  }

  // Send product recommendation
  const handleProductRec = async () => {
    await sendProductRecommendation({
      id: 'prod-123',
      title: 'Wireless Headphones',
      price: '$89.99',
      image: 'https://example.com/image.jpg',
      rating: 4.5,
      reviews: 1200,
      url: 'https://example.com/product'
    })
  }

  return (
    <div>
      <div className="messages">
        {messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} />
        ))}
      </div>
      
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleTextMessage(e.currentTarget.value)
            e.currentTarget.value = ''
          }
        }}
        disabled={isSending}
      />
    </div>
  )
}
```

## API Reference

### Hook Options

```typescript
interface UseChatOptions {
  sessionId?: string                // Unique session identifier (auto-generated if not provided)
  onError?: (error: Error) => void  // Error callback
  persistSession?: boolean          // Store session in localStorage (default: true)
  storageKey?: string              // Custom localStorage key (default: 'talkai-session-id')
}
```

### Return Values

```typescript
{
  sessionId: string                            // Active session ID (from localStorage or generated)
  messages: Message[]                          // Array of messages in chronological order
  isLoading: boolean                           // Initial loading state
  isSending: boolean                           // Message sending state
  sendTextMessage: (content: string) => Promise<void>
  sendVoiceMessage: (duration: number, audioUrl?: string) => Promise<void>
  sendFileMessage: (file: File, fileUrl: string) => Promise<void>
  sendAIResponse: (content: string) => Promise<void>
  sendProductRecommendation: (product: Product) => Promise<void>
  clearSession: () => void                     // Clear session from localStorage
}
```

### Message Types

```typescript
interface Message {
  id: string
  type: 'text' | 'voice' | 'file' | 'image' | 'product'
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  duration?: number        // Voice messages only (seconds)
  fileUrl?: string         // File/image/voice messages
  fileName?: string        // File/image messages
  fileSize?: number        // File/image messages (bytes)
  product?: {              // Product recommendation messages
    id: string
    title: string
    price: string
    image: string
    rating: number
    reviews: number
    url: string
  }
}
```

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Copy your Firebase configuration
4. Create a `.env.local` file (see `.env.local.example`)
5. Add your Firebase credentials to `.env.local`

## Firestore Structure

The hook creates the following Firestore structure:

```
sessions/
  {sessionId}/
    messages/
      {messageId}/
        - type: string
        - content: string
        - sender: 'user' | 'ai'
        - timestamp: Timestamp
        - duration?: number
        - fileUrl?: string
        - fileName?: string
        - fileSize?: number
        - product?: object
```

## Security Rules

Add these Firestore security rules for basic protection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{sessionId}/messages/{messageId} {
      allow read: if true;
      allow write: if true;
      // TODO: Add proper authentication and authorization
    }
  }
}
```

## Notes

- Messages are stored per session ID for isolation
- Real-time updates using Firestore snapshots
- Timestamps are automatically managed
- File uploads require separate storage implementation (Firebase Storage)
- Voice recordings need audio blob URL conversion
- Product recommendations support rich product data

## Error Handling

The hook includes built-in error handling. Errors are:
1. Logged to console
2. Passed to the `onError` callback if provided
3. Re-thrown for component-level handling

```tsx
const { sendTextMessage } = useChat({
  onError: (error) => {
    // Handle errors globally
    showNotification(`Error: ${error.message}`)
  }
})

// Or handle locally
try {
  await sendTextMessage('Hello')
} catch (error) {
  // Handle specific send errors
  console.error('Send failed:', error)
}
```
