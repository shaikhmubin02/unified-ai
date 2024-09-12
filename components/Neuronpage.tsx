'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Sparkles, History, Bookmark, Settings, ChevronRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

export default function Neuronpage() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    const words = response.trim().split(/\s+/)
    setWordCount(words.length)
  }, [response])

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    try {
      const response = await axios.post('/api/chat', {
        messages: [{ role: 'user', content: query }]
      })
      setResponse(response.data.content)
    } catch (error) {
      console.error('Error fetching response:', error)
      setResponse('An error occurred while processing your request.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-12 bg-white border-r border-gray-200 p-2 hidden md:flex flex-col items-center shadow-sm fixed h-full">
        <div className="mb-4">
          <Sparkles className="h-6 w-6 text-blue-500" />
        </div>
        <nav className="flex flex-col items-center space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-blue-50 transition-colors">
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
                      {response ? (
                        <div className="prose max-w-none">
                          <h2 className="text-lg font-semibold mb-2 text-gray-800">Response</h2>
                          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{response}</p>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                          <Sparkles className="h-12 w-12 text-blue-500 mb-2" />
                          <p className="text-base font-medium">Ask a question to get started!</p>
                          <p className="text-xs mt-1">Type your query in the search bar below</p>
                        </div>
                      )}
                    {response && (
                      <div className="mt-2 text-xs text-gray-500 text-right">
                        Word count: {wordCount}
                      </div>
                    )}
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