'use client'

import Link from 'next/link'
import { ChevronDown, Video, Github, Linkedin, Twitter, MessageCircle, Sparkle, Sparkles, FileText, BarChart, BookOpen, Newspaper, Menu } from 'lucide-react'
import Image from 'next/image'
import ShinyButton from '@/components/magicui/shiny-button'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const scrollToFaq = () => {
    // If we're not on the landing page, navigate there first
    if (window.location.pathname !== '/landing') {
      router.push('/landing')
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-32 my-2 bg-[#0e1011] bg-opacity-90 border-[0.2px] border-gray-700 rounded-full shadow-lg z-50">
      <div className="container mx-auto px-2 py-1 flex items-center justify-between">
        <Link href="/landing">
          <div className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Unified AI" 
              width={25} 
              height={25}
              className="animate-logo-spin origin-center"
            />
            <span className="text-md tracking-tight font-semibold text-transparent bg-gray-400 bg-clip-text">UNIFIED AI</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-9">
          <Link 
            href="/landing/pricing" 
            className="text-gray-200 font-mono tracking-wider text-sm hover:text-emerald-400 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full"
          >
            Pricing
          </Link>
          <button 
            onClick={scrollToFaq}
            className="text-gray-200 font-mono tracking-wider text-sm hover:text-emerald-400 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full"
          >
            FAQ
          </button>
          <Link 
            href="/landing/blog" 
            className="text-gray-200 font-mono tracking-wider text-sm hover:text-emerald-400 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full"
          >
            Blog
          </Link>
          <Link 
            href="/landing/changelog" 
            className="text-gray-200 font-mono tracking-wider text-sm hover:text-emerald-400 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all hover:after:w-full"
          >
            Changelog
          </Link>
        </div>

        <Link className="hidden md:block" href={isSignedIn ? "/" : "/sign-up"}>
          <ShinyButton>
            {isSignedIn ? "Dashboard" : "Get Started"}
          </ShinyButton>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 mt-2 p-4 rounded-lg shadow-lg">
          <nav className="flex flex-col space-y-2">
            <Link href="/landing/pricing" className="text-gray-200 hover:text-emerald-400">Pricing</Link>
            <button onClick={scrollToFaq} className="text-left text-gray-200 hover:text-emerald-400">FAQ</button>
            <Link href="/docs" className="text-gray-200 hover:text-emerald-400">Documentation</Link>
            <Link href="/landing/changelog" className="text-gray-200 hover:text-emerald-400">Changelog</Link>
            <Link href="/landing/blog" className="text-gray-200 hover:text-emerald-400">Blog</Link>
            <Link href={isSignedIn ? "/" : "/sign-up"} className="text-emerald-400 font-semibold">
              {isSignedIn ? "Dashboard" : "Get Started"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
