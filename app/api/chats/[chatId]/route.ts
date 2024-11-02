import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ChatHistory from '@/models/ChatHistory'
import { getAuth } from '@clerk/nextjs/server'

export async function DELETE(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params
  const { userId } = getAuth(request)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!chatId) {
    return NextResponse.json({ error: 'Missing chat ID' }, { status: 400 })
  }

  try {
    await dbConnect()

    const deletedChat = await ChatHistory.findOneAndDelete({ _id: chatId, userId })

    if (!deletedChat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Chat deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting chat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params
  const { userId } = getAuth(request)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, messages, isTitleEdited, isBookmarked } = await request.json()

  try {
    await dbConnect()

    const updateData: any = {
      ...(title && { title }),
      ...(messages && { messages }),
      ...(isTitleEdited !== undefined && { isTitleEdited }),
      ...(isBookmarked !== undefined && { isBookmarked }), // Allow updating isBookmarked
      updatedAt: new Date()
    }

    const updatedChat = await ChatHistory.findOneAndUpdate(
      { _id: chatId, userId },
      updateData,
      { new: true }
    )

    if (!updatedChat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    return NextResponse.json(updatedChat, { status: 200 })
  } catch (error) {
    console.error('Error updating chat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params
  const { userId } = getAuth(request)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()

    const chat = await ChatHistory.findOne({ _id: chatId, userId })

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    return NextResponse.json(chat, { status: 200 })
  } catch (error) {
    console.error('Error fetching chat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}