import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageSquarePlus, HelpCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useForm, ValidationError } from '@formspree/react'
import { QuestionMarkIcon } from '@radix-ui/react-icons'

export function Feedback() {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false)
  const { toast } = useToast()
  const [state, handleSubmit] = useForm("xpwageqy")

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleSubmit(e)
    setIsFeedbackDialogOpen(false)
    if (state.succeeded) {
      toast({
        title: 'Thank you!',
        description: 'Your feedback has been submitted successfully.',
      })
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#1a1b1e] border-gray-800 shadow-md hover:bg-[#2a2b2e]"
                onClick={() => setIsFeedbackDialogOpen(true)}
              >
                <QuestionMarkIcon className="h-4 w-4 text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="font-mono text-sm font-thin text-gray-300 bg-[#1a1b1e] border-gray-800 shadow-md">
              <p>Feedback / Suggestions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-[#1a1b1e] border-gray-800 shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-200 flex items-center">
              <MessageSquarePlus className="h-6 w-6 mr-2 text-[#1f8b81]" />
              Feedback / Suggestions
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              We value your input! Share your feedback or suggest new features.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" name="_subject" value="Feedback or Suggestion" />
            <div className="mt-6">
              <textarea
                id="message"
                name="message"
                className="w-full h-32 p-2 text-sm text-gray-200 bg-[#2a2b2e] border border-gray-800 rounded-lg focus:outline-none focus:text-gray-100 scrollbar-hide resize-none"
                placeholder="Type your feedback or suggestion here..."
              ></textarea>
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                onClick={() => setIsFeedbackDialogOpen(false)} 
                variant="ghost" 
                className="mr-2 text-gray-300 hover:text-gray-100 hover:bg-[#2a2b2e]"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={state.submitting}
                className="bg-[#1f8b81] hover:bg-[#106968] text-gray-100"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Updated CSS at the end of the file or in a separate CSS file
const styles = `
  .scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .resize-none {
    resize: none;
  }
`;

export default function FeedbackWithStyles() {
  return (
    <>
      <style jsx global>{styles}</style>
      <Feedback />
    </>
  )
}