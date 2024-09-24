'use client'

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Chat {
  _id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  isTitleEdited: boolean
}

export default function SharedChatPage({ params }: { params: { shareId: string } }) {
  const { shareId } = params
  const [chat, setChat] = useState<Chat | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const latestMessageRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const fetchSharedChat = async () => {
      try {
        setIsLoading(true)
        // Fetch the shared chat data
        const response = await axios.get(`/api/chats/shared-chats/${shareId}`)
        setChat(response.data.chat)
      } catch (error) {
        console.error('Error fetching shared chat:', error)
        toast({
          title: 'Error',
          description: (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load shared chat.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSharedChat()
  }, [shareId, toast])

  useEffect(() => {
    scrollToLatestMessage()
  }, [chat])

  const scrollToLatestMessage = () => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  const handleAddToHistory = async () => {
    if (!isSignedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to add this chat to your history.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsAdding(true)
      const response = await axios.post(`/api/chats/shared-chats/${shareId}/add-to-history`)
      
      if (response.status === 201) {
        toast({
          title: 'Chat Added',
          description: 'The shared chat has been added to your history.',
          variant: 'default',
        })
        
        // Navigate to home and open the added chat
        const addedChatId = response.data.chatId // Assuming the API returns the new chat ID
        router.push(`/?chatId=${addedChatId}`)
      } else if (response.status === 200) {
        toast({
          title: 'Already Added',
          description: 'This shared chat is already in your history.',
          variant: 'default',
        })
        // Navigate to home and open the existing chat
        const existingChatId = response.data.chatId // Assuming the API returns the existing chat ID
        router.push(`/?chatId=${existingChatId}`)
      }

      // Navigate to home after adding
      router.push('/')
    } catch (error) {
      console.error('Error adding shared chat to history:', error)
      toast({
        title: 'Error',
        description: (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add shared chat to history.',
        variant: 'destructive',
      })
    } finally {
      setIsAdding(false)
    }
  }

  const handleNavigateHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Sparkles className="h-8 w-8 text-green-500 animate-pulse" />
      </div>
    )
  }

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Shared chat not found or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{chat.title}</h1>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Sparkles className="h-4 w-4 text-green-500" />
          <p className="text-sm text-gray-600">Shared Chat</p>
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
            onClick={handleAddToHistory}
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add to History'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
            onClick={handleNavigateHome}
          >
            Go Home
          </Button>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-4">
        <Card className="h-full">
          <CardContent className="p-4 flex flex-col h-full">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="pt-4 pb-16">
                {chat.messages.length > 0 ? (
                  chat.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                      }`}
                      ref={message.role === 'assistant' && index === chat.messages.length - 1 ? latestMessageRef : null}
                    >
                      {message.role === 'assistant' ? (
                        <div className="flex items-start space-x-2">
                          {/* AI Profile Picture */}
                          <div className="flex-shrink-0 w-5 h-5 mt-1">
                            <Sparkles className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="relative group">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-2">
                          {/* User Message aligned to the right */}
                          <div className={`inline-block p-2 rounded-lg bg-green-100 relative group`}>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center mt-8">
                    <Sparkles className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-green-500 mb-2" />
                    <p className="text-sm md:text-base font-medium">This chat is empty.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}