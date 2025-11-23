import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import { getConversationHistory, saveMessage } from '@/lib/conversation'
import { Message } from '@/types/message'

// GET: Fetch messages for a session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId parameter' },
        { status: 400 }
      )
    }

    const messages = await getConversationHistory(db, sessionId, limit)

    return NextResponse.json({
      success: true,
      messages,
      count: messages.length,
    })
  } catch (error: any) {
    console.error('GET messages error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST: Create a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, message } = body

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'Missing sessionId or message data' },
        { status: 400 }
      )
    }

    // Validate message structure
    if (!message.type || !message.content || !message.sender) {
      return NextResponse.json(
        { error: 'Invalid message structure' },
        { status: 400 }
      )
    }

    const messageId = await saveMessage(db, sessionId, {
      type: message.type,
      content: message.content,
      sender: message.sender,
      timestamp: new Date(),
      ...(message.duration && { duration: message.duration }),
      ...(message.fileUrl && { fileUrl: message.fileUrl }),
      ...(message.fileName && { fileName: message.fileName }),
      ...(message.fileSize && { fileSize: message.fileSize }),
      ...(message.product && { product: message.product }),
    })

    return NextResponse.json({
      success: true,
      messageId,
    })
  } catch (error: any) {
    console.error('POST message error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create message' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const messageId = searchParams.get('messageId')

    if (!sessionId || !messageId) {
      return NextResponse.json(
        { error: 'Missing sessionId or messageId parameter' },
        { status: 400 }
      )
    }

    await db.collection(`sessions/${sessionId}/messages`).doc(messageId).delete()

    return NextResponse.json({
      success: true,
      messageId,
    })
  } catch (error: any) {
    console.error('DELETE message error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete message' },
      { status: 500 }
    )
  }
}

// PATCH: Update a message
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, messageId, updates } = body

    if (!sessionId || !messageId || !updates) {
      return NextResponse.json(
        { error: 'Missing sessionId, messageId, or updates' },
        { status: 400 }
      )
    }

    await db
      .collection(`sessions/${sessionId}/messages`)
      .doc(messageId)
      .update(updates)

    return NextResponse.json({
      success: true,
      messageId,
    })
  } catch (error: any) {
    console.error('PATCH message error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update message' },
      { status: 500 }
    )
  }
}
