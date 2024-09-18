import Link from 'next/link'
import { ChevronDown, Video, Github, Linkedin, Twitter, MessageCircle, Sparkle, Sparkles} from 'lucide-react'

export default function Header() {
  return (

    <header className="fixed top-0 left-0 right-0 mx-12 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 my-3 bg-white bg-opacity-90 rounded-full shadow-lg z-50 border-t-1 border-emerald-400">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/landing">
            <div className="flex items-center space-x-4">
              <Sparkles className="text-emerald-400" />
              <span className="text-xl font-bold text-gray-900">Neuron AI</span>
          </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="text-gray-900 hover:text-emerald-400" href="/landing/pricing">
              Pricing
            </Link>
            <Link className="text-gray-900 hover:text-emerald-400" href="/docs">
              Documentation
            </Link>
            <div className="relative group">
              <Link className="text-gray-900 hover:text-emerald-400" href="/landing/changelog">
                Changelog
              </Link>
            </div>
            <div className="relative group">
              <Link className="text-gray-900 hover:text-emerald-400" href="/landing/blog">
                Blog
              </Link>
            </div>
          </nav>
          <Link href="/">
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
              Dashboard
            </button>

          </Link>
        </div>
      </header>
  )
}