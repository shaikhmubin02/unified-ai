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
    })

    const content = chatCompletion.choices[0]?.message?.content || ""
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error calling Groq API:', error)
    return NextResponse.json({ error: 'An error occurred during chat completion' }, { status: 500 })
  }
}