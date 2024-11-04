import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Brain } from 'lucide-react'

interface MemoryInputProps {
  initialMemory: string
  onSave: (memory: string) => void
  maxCharacters: number
}

export function MemoryInput({ initialMemory, onSave, maxCharacters }: MemoryInputProps) {
  const [memory, setMemory] = useState(initialMemory)

  useEffect(() => {
    setMemory(initialMemory)
  }, [initialMemory])

  const handleSave = () => {
    onSave(memory)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, maxCharacters)
    setMemory(newValue)
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter instructions or context for the AI to remember..."
        value={memory}
        onChange={handleChange}
        rows={6}
        className="w-full p-3 text-gray-200 font-light bg-[#2a2b2e] border border-gray-800 rounded-lg focus:outline-none focus:text-gray-100 scrollbar-hide resize-none transition duration-200 ease-in-out"
      />
      <div className="flex justify-between items-center text-sm font-light text-gray-400">
        <span>{memory.length} / {maxCharacters} characters</span>
        <Button 
          onClick={handleSave} 
          className="bg-[#1f8b81] hover:bg-[#106968] text-gray-100 transition duration-200 ease-in-out"
        >
          Save Memory
        </Button>
      </div>
    </div>
  )
}