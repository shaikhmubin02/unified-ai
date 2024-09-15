import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ChatHistory from '@/models/ChatHistory'
import { getAuth } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()

    const chats = await ChatHistory.find({ userId }).sort({ updatedAt: -1 })

    return NextResponse.json(chats, { status: 200 })
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { userId, title, messages } = await request.json()

  if (!userId || !messages) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await dbConnect()

    const newChat = await ChatHistory.create({
      userId,
      title: title || 'New Chat',
      messages
    })

    return NextResponse.json(newChat, { status: 201 })
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}