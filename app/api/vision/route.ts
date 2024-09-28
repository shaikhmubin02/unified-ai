import { NextRequest, NextResponse } from 'next/server'
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.2-11b-vision-preview",
      max_tokens: 1024,
      temperature: 1,
      top_p: 1,
      stream: false,
      stop: null,
    })

    const content = chatCompletion.choices[0]?.message?.content || ""
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error calling Groq API:', error)
    return NextResponse.json({ error: 'An error occurred during image analysis' }, { status: 500 })
  }
}