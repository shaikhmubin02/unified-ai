  // app/api/chats/shared-chats/[shareId]/route.ts
  import { NextRequest, NextResponse } from 'next/server'
  import dbConnect from '@/lib/mongodb'
  import SharedChat from '@/models/SharedChat'
  import ChatHistory from '@/models/ChatHistory'

  export async function GET(request: NextRequest, { params }: { params: { shareId: string } }) {
    const { shareId } = params

    if (!shareId) {
      return NextResponse.json({ message: 'Share ID is required' }, { status: 400 })
    }

    try {
      await dbConnect()

      // Find the shared chat by shareId
      const sharedChat = await SharedChat.findOne({ shareId })

      if (!sharedChat) {
        return NextResponse.json({ message: 'Shared chat not found or link has expired' }, { status: 404 })
      }

      // Fetch the corresponding chat history
      const chat = await ChatHistory.findById(sharedChat.chatId).select('-userId') // Exclude userId for privacy

      if (!chat) {
        return NextResponse.json({ message: 'Chat not found' }, { status: 404 })
      }

      return NextResponse.json({ chat }, { status: 200 })
    } catch (error) {
      console.error('Error retrieving shared chat:', error)
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
  }