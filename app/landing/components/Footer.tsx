import Link from 'next/link'
import { ChevronDown, Video, Github, Linkedin, Twitter, MessageCircle, Sparkles} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-400 py-8 mx-8 sm:mx-12 md:mx-16 lg:mx-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="col-span-2 md:col-span-1 mr-4">
              <Sparkles className="text-emerald-400 mb-2" />
              <p className="text-xs dark:text-gray-300">
                Empowering curiosity with AI-driven research assistance.
              </p>
            </div>
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-2">Company</h3>
              <ul className="space-y-1">
                <li><Link href="#" className="hover:text-emerald-400">About Us</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-2">Product</h3>
              <ul className="space-y-1">
                <li><Link href="#" className="hover:text-emerald-400">Documentation</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Pricing</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Blog</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li><Link href="#" className="hover:text-emerald-400">FAQ</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Email</Link></li>
                <li><Link href="#" className="hover:text-emerald-400">Discord</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-black dark:text-white font-semibold mb-2">Try Neuron AI</h3>
              <p className="text-sm dark:text-gray-300">
                Start exploring with Neuron AI <br /> on our{' '}
                <Link href="#" className="text-emerald-400 hover:underline">
                  web app
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs dark:text-gray-400">&copy; 2024 Neuron AI - All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}