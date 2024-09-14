import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import UserMemory from '@/models/UserMemory'
import { getAuth } from '@clerk/nextjs/server'

import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const userMemoryEntry = await UserMemory.findOne({ userId })
  const memory = userMemoryEntry?.memory || ''

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: memory }, ...messages],
      model: "llama3-8b-8192",
    })

    const content = chatCompletion.choices[0]?.message?.content || ""
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error calling Groq API:', error)
    return NextResponse.json({ error: 'An error occurred during chat completion' }, { status: 500 })
  }
}