import Link from 'next/link'
import { ChevronDown, Video, Github, Linkedin, Twitter, MessageCircle, Sparkle, Sparkles} from 'lucide-react'

export default function Header() {
  return (

    <header className="fixed top-0 left-0 right-0 mx-8 sm:mx-12 md:mx-16 lg:mx-24 my-6 bg-white bg-opacity-90 rounded-full shadow-lg z-50 border-t-2 border-emerald-400">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/landing">
            <div className="flex items-center space-x-4">
              <Sparkles className="text-emerald-400" />
              <span className="text-xl font-bold">Neuron AI</span>
          </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="hover:text-emerald-400" href="/landing/pricing">
              Pricing
            </Link>
            <Link className="hover:text-emerald-400" href="/docs">
              Documentation
            </Link>
            <div className="relative group">
              <Link className="hover:text-emerald-400" href="/landing/changelog">
                Changelog
              </Link>
            </div>
            <div className="relative group">
              <Link className="hover:text-emerald-400" href="/landing/blog">
                Blog
              </Link>
            </div>
          </nav>
          <Link href="/">
            <button className="px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors duration-300 shadow-md hover:shadow-lg">
              Dashboard
            </button>
          </Link>
        </div>
      </header>
  )
}