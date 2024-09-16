  // app/api/chats/share/route.ts
  import { NextRequest, NextResponse } from 'next/server'
  import { getAuth } from '@clerk/nextjs/server'
  import dbConnect from '@/lib/mongodb'
  import ChatHistory from '@/models/ChatHistory'
  import SharedChat from '@/models/SharedChat'
  import { nanoid } from 'nanoid'

  export async function POST(request: NextRequest) {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { chatId } = body

    console.log('Received share request for chatId:', chatId);

    if (!chatId) {
      return NextResponse.json({ message: 'Chat ID is required' }, { status: 400 })
    }

    try {
      await dbConnect()

      // Verify that the chat exists and belongs to the user
      const chat = await ChatHistory.findOne({ _id: chatId, userId })

      if (!chat) {
        console.log('Chat not found or access denied for chatId:', chatId);
        return NextResponse.json({ message: 'Chat not found or access denied' }, { status: 404 })
      }

      // Generate a unique shareId using nanoid
      const shareId = nanoid(10) // Generates a 10-character unique ID

      console.log('Generated shareId:', shareId);

      // Create a new SharedChat document
      const sharedChat = new SharedChat({
        chatId: chat._id,
        shareId,
      })

      await sharedChat.save()

      // Generate the shareable link
      const origin = request.headers.get('origin') || 'http://localhost:3000'
      const shareableLink = `${origin}/shared-chat/${shareId}`

      console.log('Generated shareableLink:', shareableLink);

      return NextResponse.json({ shareableLink }, { status: 200 })
    } catch (error) {
      console.error('Error generating shareable link:', error)
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
  }