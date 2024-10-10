import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import UserMemory from '@/models/UserMemory'
import { getAuth } from '@clerk/nextjs/server'

import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  const { messages, userId, model } = await req.json()
  const auth = getAuth(req)

  // Allow both authenticated and anonymous requests
  if (auth.userId && auth.userId !== userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let memory = ''
  if (auth.userId) {
    await dbConnect()
    const userMemoryEntry = await UserMemory.findOne({ userId: auth.userId })
    memory = userMemoryEntry?.memory || ''
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: auth.userId ? [{ role: 'system', content: memory }, ...messages] : messages,
      model: model, // Use the selected model
      stream: true, // Enable streaming
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of chatCompletion) {
            const content = chunk.choices[0]?.delta?.content || ''
            controller.enqueue(encoder.encode(content))
          }
          controller.close()
        } catch (error) {
          console.error('Error streaming Groq API:', error)
          controller.error('An error occurred during chat completion')
        }
      }
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // Optionally, you can add CORS headers if needed
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error setting up stream:', error)
    return NextResponse.json({ error: 'An error occurred during chat completion' }, { status: 500 })
  }
}