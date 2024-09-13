'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Homepage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch (error) {
      console.error('Error in chat completion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Groq Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[80%]`}>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}