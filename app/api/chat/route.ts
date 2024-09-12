import { NextResponse } from 'next/server'
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  const { messages } = await req.json()

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama3-8b-8192",
    })

    const content = chatCompletion.choices[0]?.message?.content || ""
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error calling Groq API:', error)
    return NextResponse.json({ error: 'An error occurred during chat completion' }, { status: 500 })
  }
}