'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Sparkles, History, Bookmark, Brain, Settings, ChevronRight, PlusCircle, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { MemoryInput } from './MemoryInput'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatHistory {
  id: string
  title: string
  messages: Message[]
}

export default function Neuronpage() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false)
  const [memory, setMemory] = useState('')
  const [isMemoryDialogOpen, setIsMemoryDialogOpen] = useState(false)

  useEffect(() => {
    // Create a new chat only if there are no existing chats
    if (chatHistories.length === 0) {
      const initialChatId = Date.now().toString()
      const initialChat: ChatHistory = {
        id: initialChatId,
        title: 'New Chat',
        messages: []
      }
      setChatHistories([initialChat])
      setCurrentChatId(initialChatId)
    }

    // Load memory from localStorage on component mount
    const savedMemory = localStorage.getItem('chatMemory')
    if (savedMemory) {
      setMemory(savedMemory)
    }
  }, [])

  const createNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'New Chat',
      messages: []
    }
    setChatHistories(prev => [newChat, ...prev])
    setCurrentChatId(newChatId)
    setMessages([])
  }

  const handleNewChat = () => {
    createNewChat()
    setIsHistorySidebarOpen(true)
  }

  const handleSearch = async () => {
    if (!query.trim() || !currentChatId) return
    setIsLoading(true)
    const newMessage: Message = { role: 'user', content: query }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setQuery('')
    try {
      const response = await axios.post('/api/chat', {
        messages: [{ role: 'system', content: memory }, ...updatedMessages]
      })
      const assistantMessage: Message = { role: 'assistant', content: response.data.content }
      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      
      // Update chat history
      setChatHistories(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: finalMessages, title: query.slice(0, 30) + (query.length > 30 ? '...' : '') }
          : chat
      ))
    } catch (error) {
      console.error('Error fetching response:', error)
      const errorMessage: Message = { role: 'assistant', content: 'An error occurred while processing your request.' }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const selectChat = (chatId: string) => {
    const selectedChat = chatHistories.find(chat => chat.id === chatId)
    if (selectedChat) {
      setCurrentChatId(chatId)
      setMessages(selectedChat.messages)
    }
  }

  const toggleHistorySidebar = () => {
    setIsHistorySidebarOpen(!isHistorySidebarOpen)
  }

  const deleteChat = (chatId: string) => {
    setChatHistories(prev => prev.filter(chat => chat.id !== chatId))
    if (currentChatId === chatId) {
      const remainingChats = chatHistories.filter(chat => chat.id !== chatId)
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id)
        setMessages(remainingChats[0].messages)
      } else {
        createNewChat()
      }
    }
  }

  const saveMemory = (newMemory: string) => {
    setMemory(newMemory)
    localStorage.setItem('chatMemory', newMemory)
    setIsMemoryDialogOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Sidebar */}
      <div className="w-12 bg-white border-r border-gray-200 p-2 hidden md:flex flex-col items-center shadow-sm fixed h-full z-20">
        <div className="mt-3 mb-4">
          <Sparkles className="h-6 w-6 text-blue-500" />
        </div>
        <div className="w-8 h-px bg-gray-200 mb-2"></div>
        <nav className="flex flex-col items-center space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 rounded-full hover:bg-blue-50 transition-colors"
                  onClick={handleNewChat}
                >
                  <PlusCircle className="h-4 w-4 text-gray-600" />
                  <span className="sr-only">New Chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>New Chat</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 rounded-full hover:bg-blue-50 transition-colors"
                  onClick={toggleHistorySidebar}
                >
                  <History className="h-4 w-4 text-gray-600" />
                  <span className="sr-only">History</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>History</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog open={isMemoryDialogOpen} onOpenChange={setIsMemoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      <Brain className="h-4 w-4 text-gray-600" />
                      <span className="sr-only">Memory</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] bg-white border-none shadow-lg">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">AI Memory</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Set instructions or context for the AI to remember across all conversations.
                      </DialogDescription>
                    </DialogHeader>
                    <MemoryInput initialMemory={memory} onSave={saveMemory} />
                    <DialogFooter className="mt-6">
                      <div className="text-sm text-gray-500">
                        This memory will be applied to all future conversations.
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Memory</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-blue-50 transition-colors">
                  <Bookmark className="h-4 w-4 text-gray-600" />
                  <span className="sr-only">Bookmarks</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Bookmarks</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-blue-50 transition-colors">
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>

      {/* History Sidebar */}
      <div className={`w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto transition-transform duration-300 ease-in-out ${isHistorySidebarOpen ? 'translate-x-12' : '-translate-x-full'} z-10 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <Button 
            onClick={handleNewChat}
            className="w-full"
          >
            New Chat
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="text-xs font-semibold text-gray-500 mb-2">Previous Chats</div>
          <div className="space-y-2">
            {chatHistories.map(chat => (
              <div key={chat.id} className="flex items-center space-x-2">
                <Button
                  variant={chat.id === currentChatId ? "secondary" : "ghost"}
                  className="flex-grow justify-start text-left"
                  onClick={() => selectChat(chat.id)}
                >
                  {chat.title}
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteChat(chat.id)}
                        className="flex-shrink-0 h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Chat</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Delete Chat</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden md:ml-12">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-2 px-3 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-bold text-gray-800">Neuron AI</h1>
            <p className="text-xs text-gray-600">Get answers at lightning speed.</p>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-2 pb-16">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <Tabs defaultValue="focus" className="flex-1 flex flex-col">
              <TabsList className="mb-2 justify-start">
                <TabsTrigger value="focus" className="px-4 py-1">Focus</TabsTrigger>
                <TabsTrigger value="copilot" className="px-4 py-1">Copilot</TabsTrigger>
              </TabsList>
              <TabsContent value="focus" className="flex-1 overflow-hidden">
                <Card className="h-full flex flex-col mb-6">
                  <CardContent className="p-3 flex-1 overflow-hidden flex flex-col">
                    <ScrollArea className="flex-1">
                      {messages.length > 0 ? (
                        messages.map((message, index) => (
                          <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center mt-36">
                          <Sparkles className="h-12 w-12 text-blue-500 mb-2" />
                          <p className="text-base font-medium">Ask a question to get started!</p>
                          <p className="text-xs mt-1">Type your query in the search bar below</p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="copilot" className="flex-1 overflow-hidden">
                <Card className="h-full">
                  <CardContent className="p-3 h-full flex items-center justify-center">
                    <p className="text-center text-gray-500 text-sm">Copilot mode is not implemented in this demo.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Bottom Search Bar */}
        <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-gray-100 to-transparent md:ml-12">
          <div className="max-w-4xl mx-auto w-full flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 pr-20 py-3 text-sm rounded-full border-2 border-gray-200 focus:border-blue-500 transition-colors text-gray-800 bg-white shadow-lg w-full"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full text-xs px-4 py-2"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  'Searching...'
                ) : (
                  <div className="flex items-center">
                    Ask <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}