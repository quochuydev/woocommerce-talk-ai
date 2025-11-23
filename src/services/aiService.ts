/**
 * AI Service - Calls Next.js API endpoints
 * No longer uses Firebase Functions (deprecated)
 */

interface GenerateAIResponseResponse {
  success: boolean
  messageId?: string
  content?: string
  error?: string
}

// API base URL - can be configured for production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://talk-ai-widget.vercel.app'

/**
 * Call Next.js API to generate AI response
 * @param sessionId - User session ID
 * @param message - User message content
 * @param onChunk - Optional callback for streaming responses
 */
export async function generateAIResponse(
  sessionId: string,
  message: string,
  onChunk?: (text: string) => void
): Promise<GenerateAIResponseResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        message,
        stream: !!onChunk,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to generate AI response')
    }

    // Handle streaming response
    if (onChunk && response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let lastMessageId: string | undefined

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.chunk) {
                onChunk(data.chunk)
              }
              if (data.done) {
                lastMessageId = data.messageId
              }
              if (data.error) {
                throw new Error(data.error)
              }
            } catch (e) {
              console.error('[aiService] Failed to parse streaming data:', e)
            }
          }
        }
      }

      return {
        success: true,
        messageId: lastMessageId,
      }
    }

    // Handle non-streaming response
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error('[aiService] Failed to generate AI response:', error)
    return {
      success: false,
      error: error.message || 'Failed to generate AI response',
    }
  }
}
