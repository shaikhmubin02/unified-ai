import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageSquarePlus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useForm, ValidationError } from '@formspree/react'

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
                className="rounded-full bg-white shadow-md hover:bg-gray-100"
                onClick={() => setIsFeedbackDialogOpen(true)}
              >
                <MessageSquarePlus className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="font-mono text-sm font-thin text-gray-600 bg-white border-1 shadow-md">
              <p>Feedback / Suggestions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white border-none shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquarePlus className="h-6 w-6 mr-2 text-green-500" />
              Feedback / Suggestions
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              We value your input! Share your feedback or suggest new features.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <input type="hidden" name="_subject" value="Feedback or Suggestion" />
            <div className="mt-6">
              <textarea
                id="message"
                name="message"
                className="w-full h-32 p-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500 scrollbar-hide resize-none"
                placeholder="Type your feedback or suggestion here..."
              ></textarea>
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" onClick={() => setIsFeedbackDialogOpen(false)} variant="ghost" className="mr-2 text-gray-600">
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={state.submitting}
                className="bg-green-600 hover:bg-green-700 text-white"
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