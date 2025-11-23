import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import { ClaudeProvider } from '@/lib/anthropic'
import { getConversationHistory, saveMessage } from '@/lib/conversation'
import { STORE_INFO } from '@/lib/store'
import { Message } from '@/types/message'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message, stream = true } = await request.json()

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'Missing sessionId or message' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Save user message to Firestore (moved from client to backend)
    const userMessageId = await saveMessage(db, sessionId, {
      type: 'text',
      content: message,
      sender: 'user',
      timestamp: new Date(),
    })

    console.log('[API] Saved user message:', userMessageId)

    // Get conversation history
    const history = await getConversationHistory(db, sessionId, 10)

    // Initialize Claude provider
    const claudeProvider = new ClaudeProvider(apiKey)

    if (stream) {
      // Streaming response
      const encoder = new TextEncoder()
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            let fullContent = ''

            await claudeProvider.generateStreamResponse(
              {
                conversationHistory: history,
                storeContext: STORE_INFO,
              },
              (chunk) => {
                fullContent += chunk
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
                )
              }
            )

            // Save AI response to Firestore
            const aiMessageId = await saveMessage(db, sessionId, {
              type: 'text',
              content: fullContent,
              sender: 'ai',
              timestamp: new Date(),
            })

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ done: true, messageId: aiMessageId })}\n\n`
              )
            )
            controller.close()
          } catch (error: any) {
            console.error('Streaming error:', error)
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ error: error.message })}\n\n`
              )
            )
            controller.close()
          }
        },
      })

      return new NextResponse(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    } else {
      // Non-streaming response
      const response = await claudeProvider.generateResponse({
        conversationHistory: history,
        storeContext: STORE_INFO,
      })

      // Save AI response to Firestore
      const aiMessageId = await saveMessage(db, sessionId, {
        type: 'text',
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
      })

      return NextResponse.json({
        success: true,
        messageId: aiMessageId,
        content: response.content,
        tokensUsed: response.tokensUsed,
      })
    }
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
