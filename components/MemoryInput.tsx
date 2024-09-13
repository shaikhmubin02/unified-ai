import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Brain } from 'lucide-react'

interface MemoryInputProps {
  initialMemory: string
  onSave: (memory: string) => void
}

export function MemoryInput({ initialMemory, onSave }: MemoryInputProps) {
  const [memory, setMemory] = useState(initialMemory)

  useEffect(() => {
    setMemory(initialMemory)
  }, [initialMemory])

  const handleSave = () => {
    onSave(memory)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-blue-600">
        <Brain className="h-5 w-5" />
        <span className="font-semibold">AI Memory Input</span>
      </div>
      <Textarea
        placeholder="Enter instructions or context for the AI to remember..."
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
        rows={6}
        className="w-full p-3 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
      />
      <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out">
        Save Memory
      </Button>
    </div>
  )
}