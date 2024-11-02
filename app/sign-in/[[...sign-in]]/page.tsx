import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return ( 
    <div className="bg-[#0e1011] min-h-screen flex items-center justify-center">
      <SignIn/>
    </div>
  )
}