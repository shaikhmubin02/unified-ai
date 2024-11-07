'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Sparkles, History, Bookmark, Brain, Settings, ChevronDown ,ChevronRight, ChevronLeft, PlusCircle, Trash2, User, Edit2, TrendingUp, Pencil, MoreVertical, Check, Share2, Clipboard, Info, Lock, Menu, Home, FileText, DollarSign, BookOpen, CircleEllipsis, CircleEllipsisIcon, Package, Repeat, RectangleEllipsis, SquareChevronRight, Clock, BookmarkCheck, Plus, ListFilter, ArrowRight, BrainCircuit, HelpCircle, ChevronUp, Box } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { MemoryInput } from './MemoryInput'
import { SignedOut, SignedIn, UserButton, SignInButton, useUser } from '@clerk/nextjs'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import Marquee from "@/components/magicui/marquee"
import { randomQuestions, scienceQuestions, technologyQuestions } from '@/data/marqueeData'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Feedback } from './Feedback'
import { ModeToggle } from './Modetoggle'
import { FileUploader } from './FileUploader'
import { KeyboardEvent } from 'react'
import Image from 'next/image'
import Loader from './Loader'
import Link from 'next/link'
import TypingAnimation from './ui/typing-animation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatHistory {
  _id: string
  title: string
  messages: Message[]
  createdAt: string
  updatedAt: string
  isTitleEdited: boolean
  isShared: boolean
  isBookmarked: boolean // Added field
  sharedFromShareId?: string
}

export default function UnifiedMain() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false)
  const [memory, setMemory] = useState('')
  const [isMemoryDialogOpen, setIsMemoryDialogOpen] = useState(false)
  const { isSignedIn, user, isLoaded } = useUser()
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [anonymousQueriesCount, setAnonymousQueriesCount] = useState(0)
  const [isSearchDisabled, setIsSearchDisabled] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const latestAnswerRef = useRef<HTMLDivElement>(null)
  const [isSignInAlertOpen, setIsSignInAlertOpen] = useState(false)
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null)
  const [editedMessage, setEditedMessage] = useState('')
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareableLink, setShareableLink] = useState('')
  const { toast } = useToast()
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [expandedResponseTime, setExpandedResponseTime] = useState<number | null>(null)
  const [isLoadingHistories, setIsLoadingHistories] = useState(true)
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null) // Add this line

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        const fetchChatHistories = async () => {
          setIsLoadingHistories(true)
          try {
            const response = await axios.get('/api/chats')
            const sortedChats = response.data.sort((a: ChatHistory, b: ChatHistory) => 
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            setChatHistories(sortedChats)
          } catch (error) {
            console.error('Error fetching chat histories:', error)
          } finally {
            setIsLoadingHistories(false)
          }
        }

        fetchChatHistories()

        // Load memory from API on component mount
        const fetchMemory = async () => {
          try {
            const memoryResponse = await axios.get('/api/memory')
            setMemory(memoryResponse.data.memory)
          } catch (error) {
            console.error('Error fetching memory:', error)
          }
        }

        fetchMemory()
      } else {
        // Reset state and create a new anonymous chat
        resetToAnonymousState()
      }
    }
  }, [isSignedIn, isLoaded])

  const resetToAnonymousState = () => {
    const anonymousChatId = 'anonymous'
    setChatHistories([{
      _id: anonymousChatId,
      title: 'Anonymous Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTitleEdited: false,
      isShared: false,
      isBookmarked: false // Initialize as not bookmarked
    }])
    setCurrentChatId(anonymousChatId)
    setMessages([])
    setMemory('')
    setAnonymousQueriesCount(0)
    setIsSearchDisabled(false)
    // setIsHistorySidebarOpen(false)
  }

  const createNewChat = async () => {
    if (isSignedIn && user) {
      try {
        const response = await axios.post('/api/chats', {
          userId: user.id,
          title: 'New Chat',
          messages: []
        })
        setChatHistories(prev => [response.data, ...prev])
        setCurrentChatId(response.data._id)
        setMessages([])
      } catch (error) {
        console.error('Error creating new chat:', error)
      }
    } else {
      // For anonymous users
      const newChatId = Date.now().toString()
      const newChat: ChatHistory = {
        _id: newChatId,
        title: 'New Chat',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isTitleEdited: false,
        isShared: false,
        isBookmarked: false
      }
      setChatHistories(prev => [newChat, ...prev])
      setCurrentChatId(newChatId)
      setMessages([])
    }
  }

  const handleNewChat = () => {
    createNewChat()
    // setIsHistorySidebarOpen(true)
    // setIsBookmarkSidebarOpen(false) // Close bookmark sidebar if open
  }

  const handleSearch = useCallback(async (searchQuery?: string, editedMessageIndex?: number) => {
    const queryToSearch = searchQuery || query
    if (!queryToSearch.trim()) return

    if (!isSignedIn) {
      if (anonymousQueriesCount >= 5) {
        setIsAlertDialogOpen(true)
        setIsSearchDisabled(true)
        return
      }
      setAnonymousQueriesCount(prev => prev + 1)
    }

    // **Create a new chat if there's no active chat**
    if (isSignedIn && !currentChatId) {
      await createNewChat()
    }

    setIsLoading(true)
    const startTime = Date.now()
    const newMessage: Message = { role: 'user', content: queryToSearch }
    let updatedMessages: Message[]

    if (editedMessageIndex !== undefined) {
      updatedMessages = [...messages.slice(0, editedMessageIndex), newMessage]
    } else {
      updatedMessages = [...messages, newMessage]
    }

    setMessages(updatedMessages)
    setQuery('')
    setEditingMessageId(null)

    try {
      let fullAssistantResponse = ''
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: isSignedIn 
            ? [{ role: 'system', content: "You are an AI assistant." }, ...updatedMessages]
            : updatedMessages,
          userId: isSignedIn ? user.id : 'anonymous',
          model: selectedModel
        }),
      })

      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Add the assistant message placeholder immediately
      const assistantMessage: Message = { role: 'assistant', content: '' }
      setMessages(prev => [...prev, assistantMessage])

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        fullAssistantResponse += chunk
        
        setMessages(prevMessages => {
          const newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].content = fullAssistantResponse
          return newMessages
        })
      }

      const endTime = Date.now()
      setResponseTime(endTime - startTime)

      // After streaming is complete, save the final messages to the database
      if (isSignedIn && currentChatId) {
        try {
          const finalMessages = [...updatedMessages, { role: 'assistant', content: fullAssistantResponse }]
          
          // Update chat with messages and title if it's the first message
          const updateData: any = {
            messages: finalMessages
          }

          // If this is the first message, update the title
          if (messages.length === 0) {
            // Truncate the question if it's too long (e.g., more than 50 characters)
            const newTitle = queryToSearch.length > 50 
              ? queryToSearch.substring(0, 47) + '...'
              : queryToSearch;
            updateData.title = newTitle;
            updateData.isTitleEdited = false; // Mark that this is an auto-generated title
          }

          await axios.put(`/api/chats/${currentChatId}`, updateData)

          // Fetch the updated chat to ensure sync
          const updatedChatResponse = await axios.get(`/api/chats/${currentChatId}`)
          const updatedChat = updatedChatResponse.data

          setChatHistories(prev => prev.map(chat => 
            chat._id === currentChatId ? updatedChat : chat
          ))
          setMessages(updatedChat.messages)
        } catch (error) {
          console.error('Error saving chat:', error)
        }
      }

    } catch (error) {
      console.error('Error fetching response:', error)
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: 'An error occurred while processing your request.' }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [query, isSignedIn, currentChatId, messages, user?.id, selectedModel])

  // Add useEffect to handle scrolling when messages change
  useEffect(() => {
    scrollToLatestAnswer()
  }, [messages])

  const scrollToLatestAnswer = () => {
    if (latestAnswerRef.current) {
      latestAnswerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  const selectChat = async (chatId: string) => {
    try {
      // Fetch the latest chat data from the backend
      const response = await axios.get(`/api/chats/${chatId}`);
      const selectedChat = response.data;
      
      if (selectedChat) {
        setCurrentChatId(chatId);
        setMessages(selectedChat.messages);
        // Update the chat in the local state while preserving order
        setChatHistories(prev => prev.map(chat => 
          chat._id === chatId ? { ...chat, messages: selectedChat.messages } : chat
        ));
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
      // Fallback to local state if API call fails
      const localChat = chatHistories.find(chat => chat._id === chatId);
      if (localChat) {
        setCurrentChatId(chatId);
        setMessages(localChat.messages);
      }
    }
  };

  const toggleHistorySidebar = () => {
    setIsHistorySidebarOpen(!isHistorySidebarOpen)
    if (!isHistorySidebarOpen) {
      setIsBookmarkDialogOpen(false) // Close bookmark dialog when opening history sidebar
    }
  }

  const handleBookmarkClick = () => {
    if (isSignedIn) {
      setIsBookmarkDialogOpen(true)
    } else {
      setIsSignInAlertOpen(true)
    }
  }

  const deleteChat = async (chatId: string) => {
    if (isSignedIn) {
      // Delete chat from the database
      try {
        await axios.delete(`/api/chats/${chatId}`)
        setChatHistories(prev => prev.filter(chat => chat._id !== chatId))
        
        if (currentChatId === chatId) {
          const remainingChats = chatHistories.filter(chat => chat._id !== chatId)
          if (remainingChats.length > 0) {
            setCurrentChatId(remainingChats[0]._id)
            setMessages(remainingChats[0].messages)
          } else {
            setCurrentChatId(null) // No active chat
            setMessages([])
          }
        }
      } catch (error) {
        console.error('Error deleting chat:', error)
      }
    } else {
      // For anonymous users, delete chat locally
      setChatHistories(prev => prev.filter(chat => chat._id !== chatId))
      
      if (currentChatId === chatId) {
        const remainingChats = chatHistories.filter(chat => chat._id !== chatId)
        if (remainingChats.length > 0) {
          setCurrentChatId(remainingChats[0]._id)
          setMessages(remainingChats[0].messages)
        } else {
          setCurrentChatId(null) // No active chat
          setMessages([])
        }
      }
    }
  }

  const saveMemory = async (newMemory: string) => {
    if (!isSignedIn) {
      alert('Please sign in to save memory.')
      return
    }
    try {
      await axios.post('/api/memory', { memory: newMemory })
      setMemory(newMemory)
      setIsMemoryDialogOpen(false)
    } catch (error) {
      console.error('Error saving memory:', error)
    }
  }

  const handleHistoryOrNewChat = () => {
    if (!isSignedIn) {
      setIsSignInAlertOpen(false)
    } else {
      handleNewChat()
    }
  }

  const handleHistoryClick = () => {
    if (isSignedIn) {
      toggleHistorySidebar()
    } else {
      setIsSignInAlertOpen(true)
    }
  }

  const handleReRun = (index: number) => {
    const messageToReRun = messages[index];
    console.log('Message to re-run:', messageToReRun);
    if (messageToReRun.role === 'user') {
      console.log('Re-running user message:', messageToReRun.content);
      handleSearch(messageToReRun.content, index);
    } else if (index > 0 && messages[index - 1].role === 'user') {
      console.log('Re-running previous user message:', messages[index - 1].content);
      handleSearch(messages[index - 1].content, index - 1);
    } else {
      console.log('Cannot re-run: no user message found');
    }
  };

  const handleBookmark = async (chat: ChatHistory) => {
    try {
      await axios.put(`/api/chats/${chat._id}`, {
        isBookmarked: !chat.isBookmarked
      })
      
      // Only update the bookmark status, maintain current order
      setChatHistories(prev => prev.map(c => 
        c._id === chat._id 
          ? { ...c, isBookmarked: !c.isBookmarked }
          : c
      ))
      
      toast({
        title: chat.isBookmarked ? 'Removed Bookmark' : 'Bookmarked',
        description: chat.isBookmarked ? 'Chat has been removed from bookmarks.' : 'Chat has been added to bookmarks.',
      })
    } catch (error) {
      console.error('Error updating bookmark:', error)
      toast({
        title: 'Error',
        description: 'Failed to update bookmark.',
        variant: 'destructive',
      })
    }
  }

  const handleQuestionClick = (question: string) => {
    handleSearch(question)
  }

  const handleEditMessage = (index: number) => {
    setEditingMessageId(index)
    setEditedMessage(messages[index].content)
  }

  const handleSaveEdit = (index: number) => {
    handleSearch(editedMessage, index)
  }

  const handleEditTitle = (chatId: string, currentTitle: string) => {
    setEditingTitleId(chatId)
    setEditedTitle(currentTitle)
  }

  const handleSaveTitle = async (chatId: string) => {
    if (!editedTitle.trim()) {
      setEditingTitleId(null)
      return
    }

    try {
      const response = await axios.put(`/api/chats/${chatId}`, {
        title: editedTitle.trim(),
        isTitleEdited: true
      })
      
      setChatHistories(prev => prev.map(chat => 
        chat._id === chatId ? { ...chat, title: response.data.title, isTitleEdited: true } : chat
      ))
      setEditingTitleId(null)
    } catch (error) {
      console.error('Error updating chat title:', error)
    }
  }

  const handleShareChat = async (chat: ChatHistory) => {
    try {
      console.log('Attempting to share chat:', chat._id);
      // Open the share dialog
      setIsShareDialogOpen(true);

      // Make API call to generate a shareable link
      const response = await axios.post('/api/chats/share', { chatId: chat._id });

      console.log('Share API response:', response.data);
      const { shareableLink } = response.data;
      setShareableLink(shareableLink);
    } catch (error) {
      console.error('Error sharing chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate shareable link.',
        variant: 'destructive',
      });
      setIsShareDialogOpen(false);
    }
  };

  // Reset shareable link when dialog closes
  useEffect(() => {
    if (!isShareDialogOpen) {
      setShareableLink('');
    }
  }, [isShareDialogOpen]);

  // useEffect to handle auto-focus
  useEffect(() => {
    if (isSignedIn && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSignedIn]) // Focus when isSignedIn changes

  return (
    <div className="flex h-screen bg-[#191a1a]">
      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-2 right-2 z-30 text-black hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <SquareChevronRight className="h-5 w-5  text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white p-0">
          <div className="flex flex-col h-full">
            {/* User section */}
            <div className="py-6 px-4 bg-gradient-to-r from-green-400 to-blue-500">
              {isSignedIn ? (
                <div className="">
                  <UserButton />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full justify-start  text-white bg-transparent border-white hover:bg-white hover:text-green-500 transition-colors duration-200">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
            
            {/* Main menu items */}
            <div className="flex-1 py-4 px-2 space-y-1">
              {[
                { icon: PlusCircle, label: "New Chat", onClick: handleHistoryOrNewChat },
                { icon: History, label: "History", onClick: handleHistoryClick },
                { icon: Bookmark, label: "Bookmarks", onClick: handleBookmarkClick },
                { icon: Brain, label: "Memory", onClick: () => setIsMemoryDialogOpen(true) },
                { icon: TrendingUp, label: "Trending Topics", onClick: () => {} },
              ].map((item, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200"
                  onClick={() => {
                    item.onClick()
                    setIsMobileSidebarOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-green-500 transition-colors duration-200">
                    <CircleEllipsisIcon className="mr-2 h-4 w-4" />
                    Navigation
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {[
                    { emoji: "🏠", label: "About", path: "/landing" },
                    { emoji: "💲", label: "Pricing", path: "/landing/pricing" },
                    { emoji: "📃", label: "Docs", path: "/docs" },
                    { emoji: "📖", label: "Blog", path: "/landing/blog" },
                  ].map((item, index) => (
                    <DropdownMenuItem key={index} onClick={() => router.push(item.path)}>
                      {item.emoji} {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Sidebar (hidden on mobile) */}
      <div className="w-56 bg-[#202222] border-r border-gray-800 p-2 hidden md:flex flex-col items-start shadow-sm fixed h-full z-20">
        {/* Top section with logo and new chat */}
        <div className="flex flex-col items-start space-y-4 w-full">
          <div className="flex-2 flex items-start justify-start space-x-2 mt-1 w-full ml-2">
            <Image src="/logo.png" alt="Unified AI" width={30} height={30} /> 
            <p className="text-gray-300 font-serif font-normal mt-1 mb-3">Unified AI</p>
          </div>
          {/* <div className="w-full h-px bg-gray-200 mb-2"></div> */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="border border-gray-700 bg-[#2d2f2f] shadow-none text-gray-300 hover:bg-[#2d2f2f] hover:text-white rounded-xl px-3 py-1.5 text-sm font-medium ml-2"
                  onClick={handleNewChat}
                >
                  <Plus className="h-4 w-4 text-gray-300 mr-2 -ml-1" />
                  New Chat
                  
                </Button>
                {/* <Button
                  variant="ghost"
                  className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 rounded-md px-3 py-1.5 text-sm font-medium ml-2"
                  onClick={handleNewChat}
                >
                  <Plus className="h-4 w-4 text-gray-300 mr-2" />
                  New Chat
                  
                </Button> */}
              </TooltipTrigger>
              <TooltipContent side="right" className='font-mono text-sm font-thin text-gray-300 bg-[#2a2b2e] border-1 shadow-md mb-8 '>
                <p>New Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <p className="ml-2 text-gray-300 font-mono font-thin text-sm -mb-3 mt-2">Recents</p>

        {/* Chat History Card - Scrollable */}
        <div className="flex-1 w-full mt-4 mb-4 overflow-hidden">
          <Card className="bg-[#1a1b1e] border-gray-800 h-full">
            <ScrollArea 
              className="h-[calc(100vh-280px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:hidden active:[&::-webkit-scrollbar]:block hover:[&::-webkit-scrollbar]:block [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              <div className="p-2 space-y-0.5">
                {isLoadingHistories ? (
                  <div className="flex justify-center items-center py-4 mt-32">
                    <Loader />
                  </div>
                ) : (
                  chatHistories.map((chat, originalIndex) => (
                    <div key={`${chat._id}-${originalIndex}`} className="flex items-center group">
                      <Button
                        variant={chat._id === currentChatId ? "secondary" : "ghost"}
                        className={`flex-grow justify-start text-left truncate text-xs font-thin max-w-[76%] min-h-0 h-7 ${
                          chat._id === currentChatId ? 'text-gray-300 bg-[#2d2f2f]' : 'text-gray-400 hover:bg-[#2d2f2f]'
                        } px-2`}
                        onClick={() => selectChat(chat._id)}
                      >
                        {chat.title}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-6 w-6 opacity-0 group-hover:opacity-100 rounded-full hover:bg-[#3d3f3f] transition-all ${
                              chat._id === currentChatId ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <MoreVertical className="h-3 w-3 text-gray-300" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='font-mono'>
                          <DropdownMenuItem onClick={() => handleEditTitle(chat._id, chat.title)}>
                            <Edit2 className='h-4 w-4 ml-1 mr-2' />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBookmark(chat)}>
                            {chat.isBookmarked ? (
                              <>
                                <BookmarkCheck className='h-4 w-4 ml-1 mr-2' />
                                Remove Bookmark
                              </>
                            ) : (
                              <>
                                <Bookmark className='h-4 w-4 ml-1 mr-2' />
                                Bookmark
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareChat(chat)}>
                            <Share2 className='h-4 w-4 ml-1 mr-2' />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteChat(chat._id)} className="text-red-600">
                            <Trash2 className='h-4 w-4 ml-1 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Bottom Tools Section */}
        <div className="w-full space-y-2 mt-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start space-x-2 hover:text-white hover:bg-[#2d2f2f]"
                  onClick={() => setIsMemoryDialogOpen(true)}
                >
                  <BrainCircuit className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Memory</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className='font-mono text-sm font-thin text-gray-300 bg-[#2a2b2e] border-1 shadow-md mb-4'>
                <p>Memory</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start space-x-2 hover:text-white hover:bg-[#2d2f2f]"
                  onClick={handleBookmarkClick}
                >
                  <Bookmark className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Bookmarks</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className='font-mono text-sm font-thin text-gray-300 bg-[#2a2b2e] border-1 shadow-md mb-4'>
                <p>Bookmarks</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start space-x-2 hover:text-white hover:bg-[#2d2f2f]"
              >
                <TrendingUp className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300">Trending</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className='font-mono text-sm font-thin text-gray-300 bg-[#2a2b2e] border-1 shadow-md mb-4'>
              <p>Trending Topics</p>
            </TooltipContent>
          </Tooltip> */}
        </div>

        {/* User Section */}
        <div className="pt-2 border-t border-gray-700 ml-1">
          {/* {isSignedIn ? (
            <div className="flex items-center space-x-2">
              <UserButton />
              <p className="text-gray-300 text-sm">
                {user?.fullName || user?.firstName}
              </p>
            </ div>
          ) : (
            <SignInButton mode="modal">
              <Button variant="ghost" className="w-full justify-start space-x-2">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </SignInButton>
          )} */}
          <Button 
            variant="ghost" 
            className="w-full justify-start space-x-2 text-gray-300 hover:text-white hover:bg-[#2d2f2f]"
            onClick={() => router.push('/landing/pricing')}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-700 -ml-3">
              <Package className="h-5 w-5 text-gray-400 animate-logo-spin-8 origin-center" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-start text-gray-300">Upgrade plan</span>
              <span className="text-[10px] text-start text-gray-400">Access a range of top models</span>
            </div>
          </Button>
        </div>
      </div>

      {/* History Sidebar - Only show for signed-in users */}
      {/* {isSignedIn && (
        <div className={`w-56 lg:ml-12 bg-[#1a1b1e] border-r border-gray-800 fixed h-full transition-transform duration-300 ease-in-out ${isHistorySidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-10 flex flex-col`}>
          <div className="p-3 border-b border-gray-200 flex justify-between items-center mt-14">
            <p className="text-gray-300 font-serif font-normal">Previous Chats</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleHistorySidebar}
              className="h-6 w-6"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <div className="space-y-2">
              {chatHistories.map(chat => (
                <div key={chat._id} className="flex items-center space-x-2">
                  {editingTitleId === chat._id ? (
                    <div className="flex-grow flex items-center">
                      <Input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="mr-2 text-sm text-gray-800"
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle(chat._id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSaveTitle(chat._id)}
                        className="h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant={chat._id === currentChatId ? "secondary" : "ghost"}
                        className={`flex-grow justify-start text-left truncate text-sm font-thin ${
                          chat._id === currentChatId ? 'text-gray-800 font-medium' : 'text-gray-800'
                        }`}
                        onClick={() => selectChat(chat._id)}
                      >
                        {chat.title}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-40 group-hover:opacity-100 rounded-full hover:bg-[#3d3f3f] transition-all"
                          >
                            <MoreVertical className="h-3 w-3 text-gray-300" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='font-mono'>
                          <DropdownMenuItem onClick={() => handleEditTitle(chat._id, chat.title)}>
                            <Edit2 className='h-4 w-4 ml-1 mr-2' />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleBookmark(chat)} className="text-gray-600">
                            {chat.isBookmarked ? (
                              <>
                                <BookmarkCheck className='h-4 w-4 ml-1 mr-2' />
                                Remove Bookmark
                              </>
                            ) : (
                              <>
                                <Bookmark className='h-4 w-4 ml-1 mr-2' />
                                Bookmark
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareChat(chat)}>
                            <Share2 className='h-4 w-4 ml-1 mr-2' />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteChat(chat._id)} className="text-red-600">
                            <Trash2 className='h-4 w-4 ml-1 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )} */}

      {/* Bookmarks Dialog */}
      <Dialog open={isBookmarkDialogOpen} onOpenChange={setIsBookmarkDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-[#1a1b1e] border-none shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-200 flex items-center">
              <BookmarkCheck className="h-6 w-6 mr-2 text-[#106968]" />
              Bookmarked Chats
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Access your saved conversations quickly.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-6 max-h-[60vh] pr-4 overflow-y-auto">
            <div className="space-y-2">
              {chatHistories
                .filter(chat => chat.isBookmarked)
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .map((chat) => (
                  <div key={chat._id} className="flex items-center space-x-2 mb-2 group">
                    <Button
                      variant="ghost"
                      className="flex-grow justify-start text-left truncate text-sm font-thin text-gray-300 hover:text-white hover:bg-[#2d2f2f]"
                      onClick={() => {
                        selectChat(chat._id)
                        setIsBookmarkDialogOpen(false)
                      }}
                    >
                      {chat.title}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 rounded-full hover:bg-[#3d3f3f]"
                        >
                          <MoreVertical className="h-3 w-3 text-gray-300" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="font-mono">
                        <DropdownMenuItem onClick={() => handleEditTitle(chat._id, chat.title)}>
                          <Edit2 className="h-4 w-4 ml-1 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBookmark(chat)}>
                          <BookmarkCheck className="h-4 w-4 ml-1 mr-2" />
                          Remove Bookmark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareChat(chat)}>
                          <Share2 className="h-4 w-4 ml-1 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteChat(chat._id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 ml-1 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              {chatHistories.filter(chat => chat.isBookmarked).length === 0 && (
                <div className="text-center py-8">
                  <Bookmark className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">No bookmarks yet.</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Bookmark your favorite conversations to find them quickly.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden md:pl-56">
        {/* Remove the header section and add Feedback button in top-right */}
        <div className="fixed top-3 right-4 z-20 flex items-center space-x-2">
          {currentChatId && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-[#2d2f2f]"
                    onClick={() => {
                      const currentChat = chatHistories.find(chat => chat._id === currentChatId);
                      if (currentChat) {
                        handleBookmark(currentChat);
                      }
                    }}
                  >
                    {chatHistories.find(chat => chat._id === currentChatId)?.isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-mono text-sm font-thin">
                  {chatHistories.find(chat => chat._id === currentChatId)?.isBookmarked ? 
                    'Remove bookmark' : 'Bookmark chat'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-[#2d2f2f]">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Feedback />
        </div>

        {/* Content Area - adjust padding and width */}
        <main className="flex-1 overflow-y-auto p-2 pb-16 pt-4 w-full max-w-[calc(100vw-224px)] mx-auto">
          <div className="max-w-3xl mx-auto h-full flex flex-col">
            <Card className="flex flex-col mb-6 bg-transparent border-none shadow-none mr-12">
              <CardContent className="p-3 flex flex-col">
                <ScrollArea className="w-full">
                  <div className="pt-4 pb-16">
                    {messages.length > 0 ? (
                      messages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`mb-4 ${
                            message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                          }`}
                          ref={message.role === 'assistant' && index === messages.length - 1 ? latestAnswerRef : null}
                        >
                          {message.role === 'assistant' ? (
                            <div className="flex items-start space-x-2 relative group">
                              {/* AI Profile Picture */}
                              <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                                <Image src="/logo.png" alt="Unified AI" width={20} height={20} className="animate-logo-spin-8 origin-center"/>
                              </div>
                              <div className="relative w-full">
                                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap pb-8">
                                  {message.content}
                                </div>
                                {/* Optional: Add a loader or typing indicator */}
                                {isLoading && index === messages.length - 1 && (
                                  <div className="loader">...</div>
                                )}
                                {/* Buttons container */}
                                <div className={`absolute bottom-0 left-0 flex space-x-2 ${
                                  index === messages.length - 1 
                                    ? 'opacity-100' 
                                    : 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                                }`}>
                                  {/* Copy Button */}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 hover:bg-[#2d2f2f]"
                                    onClick={() => {
                                      navigator.clipboard.writeText(message.content)
                                      toast({
                                        title: 'Copied!',
                                        description: 'The message has been copied to your clipboard.',
                                      })
                                      // Change button text to "Copied!"
                                      const button = document.querySelector(`#copy-button-${index}`) as HTMLButtonElement;
                                      if (button) {
                                        const originalContent = button.innerHTML;
                                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-600"><path d="M20 6 9 17l-5-5"/></svg>';
                                        button.disabled = true;
                                        setTimeout(() => {
                                          button.innerHTML = originalContent;
                                          button.disabled = false;
                                        }, 2000);
                                      }
                                    }}
                                    aria-label="Copy message"
                                    id={`copy-button-${index}`}
                                  >
                                    <Clipboard className="h-4 w-4 text-gray-500" />
                                  </Button>

                                  {/* Re-run Button */}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 hover:bg-[#2d2f2f]"
                                    onClick={() => {
                                      handleReRun(index);
                                    }}
                                  >
                                    <Repeat className="h-4 w-4 text-gray-500" />
                                  </Button>

                                  {/* Model Selection Button */}
                                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                                    <SelectTrigger className="h-5 w-5 p-0 border-none [&>svg]:hidden shadow-none">
                                      <SelectValue>
                                        <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-[#2d2f2f]">
                                          <Package className="h-4 w-4 mt-2 text-gray-500" />
                                        </Button>
                                      </SelectValue>
                                    </SelectTrigger>
                                    
                                    <SelectContent className="bg-[#1a1b1e] border border-gray-800 shadow-lg">
                                      {/* OpenAI Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin" 
                                        value="header-openai" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/openai.png" 
                                            alt="OpenAI" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>OpenAI Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="o1-preview">o1-preview</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="o1-mini">o1-mini</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gpt4o">GPT-4o</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gpt4-mini">GPT-4o Mini</SelectItem>

                                      {/* Anthropic Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-anthropic" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/anthropic.png" 
                                            alt="Anthropic" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Anthropic Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude35-sonnet-20240620">Claude 3.5 Sonnet 20241022</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude35-sonnet">Claude 3.5 Sonnet</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude35-haiku">Claude 3.5 Haiku</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude3-opus">Claude 3 Opus</SelectItem>

                                      {/* Google Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-google" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/gemini-logo.png" 
                                            alt="Google" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Google Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gemini15-pro">Gemini 1.5 Pro</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gemini15-flash">Gemini 1.5 Flash</SelectItem>

                                      {/* Meta Models */}
                                      <SelectItem 
                                        className="font-thin mt-2" 
                                        value="header-meta" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/meta.png" 
                                            alt="Meta" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Meta Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="llama3-8b-8192">Llama 3.1</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="llama-3.2-90b-text-preview">Llama 3.2</SelectItem>
                                       
                                      {/* Mistral Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-other" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/mistral.png" 
                                            alt="Mistral" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Mistral Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="ministarl3b">Ministral 3B</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="ministarl8b">Ministral 8B</SelectItem>
                                    
                                      {/* DeepSeek Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-other" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/deepseek.png" 
                                            alt="DeepSeek" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>DeepSeek Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="deepseek-v2.5">DeepSeek-V2.5</SelectItem>

                                      {/* Text to Image Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-other" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                                            <Box className="w-3 h-3 text-black" />
                                          </div>
                                          <span className='text-gray-300'>Text to Image</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="dalle-3">
                                      <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/chatgpt.jpg" 
                                            alt="DALL·E" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>DALL·E 3</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="stable-diffusion-3.5">
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/stability.jpg" 
                                            alt="Stable Diffusion" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Stable Diffusion 3.5</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>

                                  {/* Response Time Button (Response time:) */}
                                  {responseTime !== null && index === messages.length - 1 && (
                                    <div className="relative flex items-center">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 p-0 hover:bg-[#2d2f2f]"
                                        onMouseEnter={() => setExpandedResponseTime(responseTime)}
                                        onMouseLeave={() => setExpandedResponseTime(null)}
                                        onClick={() => setExpandedResponseTime(expandedResponseTime === responseTime ? null : responseTime)}
                                      >
                                        <Clock className="h-4 w-4 text-gray-500" />
                                      </Button>
                                      <div 
                                        className={`absolute left-full ml-1 transition-all duration-300 ease-in-out overflow-hidden ${
                                          expandedResponseTime === responseTime ? 'w-40 opacity-100' : 'w-0 opacity-0'
                                        }`}
                                      >
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                          {responseTime}ms
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start space-x-2">
                              {/* User Message aligned to the right */}
                              <div className={`inline-block p-2 rounded-lg bg-[#2a2b2e] relative group`}>
                                {editingMessageId === index ? (
                                  <div className="flex items-center">
                                    <Input
                                      ref={inputRef}
                                      className="bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder-gray-400"
                                      placeholder="Edit message..."
                                      value={editedMessage}
                                      onChange={(e) => setEditedMessage(e.target.value)}
                                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(index)}
                                    />
                                    <Button onClick={() => handleSaveEdit(index)} size="sm">Save</Button>
                                  </div>
                                ) : (
                                  <div className='flex -space-x-2'>
                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditMessage(index)}
                                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full opacity-0 hover:bg-[#2d2f2f] group-hover:opacity-100 transition-opacity rounded-full"
                                    >
                                      <Pencil className="h-4 w-4 text-gray-300" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
                        {/* Container for both input and focus button */}
                        <div className="relative mb-8 w-full max-w-2xl mr-36">
                          {/* New Search Input Component */}
                          <div className="w-full mt-28">
                            <TypingAnimation
                              className="text-gray-300 text-xl font-mono mb-4"
                              text="Which AI genius should we wake up today?☕️"
                            />
                            <div className="flex flex-col gap-2 p-2 rounded-md border border-gray-700 bg-[#202222] mr-6">
                              <Input
                                ref={inputRef}
                                className="bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder-gray-400 caret-[#106968]"
                                placeholder="Ask anything..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isSearchDisabled && handleSearch()}
                              />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  
                                  {/* Model Selection Button */}
                                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                                    <SelectTrigger className="h-5 flex items-center gap-2 px-2 border-none [&>svg]:hidden shadow-none hover:bg-[#2d2f2f] group">
                                      <SelectValue>
                                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-white">
                                          <Package className="h-4 w-4 group-hover:text-white"/>
                                          <span className='text-sm'>Models</span>
                                        </div>
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1b1e] border border-gray-800 shadow-lg">
                                      {/* OpenAI Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin" 
                                        value="header-openai" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/openai.png" 
                                            alt="OpenAI" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>OpenAI Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="o1-preview">o1-preview</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="o1-mini">o1-mini</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gpt4o">GPT-4o</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gpt4-mini">GPT-4o Mini</SelectItem>

                                      {/* Anthropic Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-anthropic" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/anthropic.png" 
                                            alt="Anthropic" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Anthropic Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude35-sonnet-20240620">Claude 3.5 Sonnet 20241022</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude35-sonnet">Claude 3.5 Sonnet</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude35-haiku">Claude 3.5 Haiku</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="claude3-opus">Claude 3 Opus</SelectItem>

                                      {/* Google Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-google" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/gemini-logo.png" 
                                            alt="Google" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Google Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gemini15-pro">Gemini 1.5 Pro</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="gemini15-flash">Gemini 1.5 Flash</SelectItem>

                                      {/* Meta Models */}
                                      <SelectItem 
                                        className="font-thin mt-2" 
                                        value="header-meta" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/meta.png" 
                                            alt="Meta" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Meta Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="llama31-70b">Llama 3.1 70B</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="llama31-405b">Llama 3.1 405B</SelectItem>
                                       
                                      {/* Mistral Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-other" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/mistral.png" 
                                            alt="Mistral" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Mistral Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="ministarl3b">Ministral 3B</SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="ministarl8b">Ministral 8B</SelectItem>
                                    
                                      {/* DeepSeek Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-other" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/deepseek.png" 
                                            alt="DeepSeek" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>DeepSeek Models</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="deepseek-v2.5">DeepSeek-V2.5</SelectItem>

                                      {/* Text to Image Models */}
                                      <SelectItem 
                                        className="text-gray-300 font-thin mt-2" 
                                        value="header-other" 
                                        disabled
                                      >
                                        <div className="flex items-center space-x-2">
                                          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                                            <Box className="w-3 h-3 text-black" />
                                          </div>
                                          <span className='text-gray-300'>Text to Image</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="dalle-3">
                                      <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/chatgpt.jpg" 
                                            alt="DALL·E" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>DALL·E 3</span>
                                        </div>
                                      </SelectItem>
                                      <SelectItem className="text-gray-300 pl-4 focus:bg-[#2d2f2f] focus:text-white hover:bg-[#2d2f2f] hover:text-white" value="stable-diffusion-3.5">
                                        <div className="flex items-center space-x-2">
                                          <Image 
                                            src="/stability.jpg" 
                                            alt="Stable Diffusion" 
                                            width={16} 
                                            height={16} 
                                            className="rounded-sm bg-white" 
                                            unoptimized
                                          />
                                          <span className='text-gray-300'>Stable Diffusion 3.5</span>
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  <Button variant="ghost" className="h-5 flex items-center gap-2 px-2 text-gray-400 hover:text-white hover:bg-[#2d2f2f]">
                                    <Plus className="h-4 w-4" />
                                    <span>Attach</span>
                                  </Button>
                                </div>
                                <div className="flex items-center gap-2">  
                                  <Button 
                                    size="icon" 
                                    className="bg-[#106968] hover:bg-gray-600 text-white rounded-full" 
                                    onClick={() => handleSearch()}
                                    disabled={isLoading || isSearchDisabled || !query.trim()}
                                  >
                                    <ArrowRight className="h-4 w-4 text-gray-100" />
                                    <span className="sr-only">Ask</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Rest of the marquee content */}
                        <div className="w-full max-w-4xl overflow-hidden space-y-2 mb-3 -mr-6">
                          {/* Random Questions Marquee */}
                          <div className="relative">
                            <Marquee 
                              className="py-1.5" 
                              pauseOnHover={true} 
                              repeat={2} 
                              speed={80}
                              gradient={true}
                              gradientColor={[26, 27, 30]}  // This should match your bg color
                            >
                              {randomQuestions.map((item, index) => (
                                <div
                                  key={index}
                                  className="mx-6 cursor-pointer group"
                                  onClick={() => handleQuestionClick(item.question)}
                                >
                                  <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-200">
                                    {item.emoji} {item.question}
                                  </span>
                                </div>
                              ))}
                            </Marquee>
                          </div>

                          {/* Science Questions Marquee */}
                          <div className="relative">
                            <Marquee 
                              className="py-1.5" 
                              pauseOnHover={true} 
                              repeat={2} 
                              speed={90}
                              gradient={true}
                              gradientColor={[26, 27, 30]}
                            >
                              {scienceQuestions.map((item, index) => (
                                <div
                                  key={index}
                                  className="mx-6 cursor-pointer group"
                                  onClick={() => handleQuestionClick(item.question)}
                                >
                                  <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-200">
                                    {item.emoji} {item.question}
                                  </span>
                                </div>
                              ))}
                            </Marquee>
                          </div>

                          {/* Technology Questions Marquee */}
                          <div className="relative">
                            <Marquee 
                              className="py-1.5" 
                              pauseOnHover={true} 
                              repeat={2} 
                              speed={100}
                              gradient={true}
                              gradientColor={[26, 27, 30]}
                            >
                              {technologyQuestions.map((item, index) => (
                                <div
                                  key={index}
                                  className="mx-6 cursor-pointer group"
                                  onClick={() => handleQuestionClick(item.question)}
                                >
                                  <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-200">
                                    {item.emoji} {item.question}
                                  </span>
                                </div>
                              ))}
                            </Marquee>
                          </div>
                        </div>

                        {/* Footer */}
                        <footer className={`fixed bottom-0 border-none bg-none px-6 py-4 mr-36`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <Link href="#" className="hover:text-white">
                                Pro
                              </Link>
                              <Link href="#" className="hover:text-white">
                                Enterprise
                              </Link>
                              <Link href="#" className="hover:text-white">
                                Store
                              </Link>
                              <Link href="#" className="hover:text-white">
                                Blog
                              </Link>
                            </div>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="h-8 gap-2 text-gray-400 hover:bg-transparent hover:text-gray-300">
                                English (English)
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </footer>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Bottom Search Bar - adjust positioning */}
        {messages.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-[#0e1011] to-transparent md:pl-56">
            <div className="max-w-3xl mx-auto w-full flex justify-center">
              <div className="relative w-full max-w-2xl">
                <PlusCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={isSearchDisabled ? "Sign in to ask more questions" : "Ask anything..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isSearchDisabled && handleSearch()}
                  className={`pl-12 pr-20 py-3 text-sm rounded-full border-2 border-gray-700 text-gray-300 caret-[#106968] bg-[#1a1b1e] shadow-lg w-full ${isSearchDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSearchDisabled}
                />
                <Button 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full text-xs px-4 py-2 bg-[#106968] hover:bg-gray-600 text-white"
                  onClick={() => handleSearch()}
                  disabled={isLoading || isSearchDisabled}
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
        )}
      </div>

      {/* Alert Dialog for maximum queries reached */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent className="bg-[#1a1b1e] rounded-lg shadow-xl border border-gray-800 p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-gray-200 mb-2">Sign in required</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-base">
              You&apos;ve reached the maximum number of queries for anonymous users. Please sign in to continue asking questions and enjoy unlimited access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <SignInButton mode="modal">
              <AlertDialogAction 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
              >
                Sign In
              </AlertDialogAction>
            </SignInButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog for non-signed-in users trying to access history or bookmark */}
      <AlertDialog open={isSignInAlertOpen} onOpenChange={setIsSignInAlertOpen}>
        <AlertDialogContent className="bg-[#1a1b1e] rounded-lg shadow-xl border border-gray-800 p-6 max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-gray-200 mb-2">Sign in required</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-base">
              Please sign in to access chat history, bookmarks, and create new chats.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <SignInButton mode="modal">
              <AlertDialogAction 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
              >
                Sign In
              </AlertDialogAction>
            </SignInButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-[#1a1b1e] border-none shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-200 flex items-center">
              <Share2 className="h-6 w-6 mr-2 text-green-500" />
              Share Chat
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Share this chat by copying the link below and sending it to others.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <div className="bg-[#2a2b2e] p-4 rounded-lg border border-gray-700">
              <p className="text-sm font-medium text-gray-200 mb-2">Shareable Link</p>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 mr-2 text-gray-300 bg-transparent border-gray-600 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink)
                    toast({
                      title: 'Link Copied',
                      description: 'The shareable link has been copied to your clipboard.',
                    })
                    // Change button text to "Link Copied"
                    const button = document.querySelector('.copy-link-button') as HTMLButtonElement;
                    if (button) {
                      button.innerHTML = '<svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Link Copied';
                      button.disabled = true;
                      setTimeout(() => {
                        button.innerHTML = '<svg class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy Link';
                        button.disabled = false;
                      }, 2000);
                    }
                  }}
                  className="whitespace-nowrap text-gray-300 copy-link-button"
                >
                  <Clipboard className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-300">
              <p className="flex items-center mb-2">
                <Info className="h-4 w-4 mr-2 text-green-500" />
                This link allows others to view this chat.
              </p>
              <p className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-blue-500" />
                Your chat history and personal information remain private.
              </p>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button onClick={() => setIsShareDialogOpen(false)} variant="ghost" className="mr-2 text-gray-300">
              Cancel
            </Button>
            <Button onClick={() => setIsShareDialogOpen(false)} className="bg-green-600 hover:bg-green-700 text-white">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Memory Dialog */}
      <Dialog open={isMemoryDialogOpen} onOpenChange={setIsMemoryDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-[#1a1b1e] border-none shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-200 flex items-center">
              <BrainCircuit className="h-6 w-6 mr-2 text-[#106968]" />
              AI Memory
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Set a persistent memory for the AI to remember across all conversations.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <MemoryInput
              initialMemory={memory}
              onSave={saveMemory}
              maxCharacters={1000}
              // onClose={() => setIsMemoryDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}