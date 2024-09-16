import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import dbConnect from '@/lib/mongodb'
import SharedChat from '@/models/SharedChat'
import ChatHistory from '@/models/ChatHistory'

export async function POST(request: NextRequest, { params }: { params: { shareId: string } }) {
  const { shareId } = params
  const { userId } = getAuth(request)

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  if (!shareId) {
    return NextResponse.json({ message: 'Share ID is required' }, { status: 400 })
  }

  try {
    await dbConnect()

    // Check if the shared chat exists
    const sharedChat = await SharedChat.findOne({ shareId })

    if (!sharedChat) {
      return NextResponse.json({ message: 'Shared chat not found or link has expired' }, { status: 404 })
    }

    // Check if the user already has this shared chat in their history
    const existingChat = await ChatHistory.findOne({
      userId,
      isShared: true,
      sharedFromShareId: shareId
    })

    if (existingChat) {
      // Chat already exists in history
      return NextResponse.json({ message: 'Shared chat already exists in your history', chat: existingChat }, { status: 200 })
    }

    // Fetch the original chat
    const originalChat = await ChatHistory.findById(sharedChat.chatId)

    if (!originalChat) {
      return NextResponse.json({ message: 'Original chat not found' }, { status: 404 })
    }

    // Create a new ChatHistory entry as a shared chat
    const newSharedChat = new ChatHistory({
      userId,
      title: originalChat.title,
      messages: originalChat.messages,
      isShared: true,
      sharedFromShareId: shareId
    })

    await newSharedChat.save()

    return NextResponse.json({ message: 'Shared chat added to your history', chat: newSharedChat }, { status: 201 })
  } catch (error) {
    console.error('Error adding shared chat to history:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}