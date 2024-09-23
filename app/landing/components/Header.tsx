'use client'

import Link from 'next/link'
import { ChevronDown, Video, Github, Linkedin, Twitter, MessageCircle, Sparkle, Sparkles, FileText, BarChart, BookOpen, Newspaper, Menu } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from 'next/image'
import ShinyButton from '@/components/magicui/shiny-button'
import { useState } from 'react' // Add this import

export default function Header() {
  // Add state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 mx-4 sm:mx-8 md:mx-12 lg:mx-24 xl:mx-32 my-3 bg-white bg-opacity-90 rounded-full shadow-lg z-50 border-t-1 border-emerald-400">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/landing">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-emerald-400" />
            <span className="text-lg tracking-tight font-semibold text-gray-600">Neuron AI</span>
          </div>
        </Link>
        
        {/* Hide NavigationMenu on small screens */}
        <div className="hidden md:block">
          <NavigationMenu className='ml-3'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-6 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[1fr_1fr]">
                    <div className="">
                      <NavigationMenuLink href="/landing/pricing">
                        <div className="flex flex-col justify-end w-full h-full bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-lg p-6 no-underline outline-none focus:shadow-md">
                          <div className="text-lg font-medium text-black">Pricing Plans</div>
                          <p className="text-sm leading-tight text-black">
                            Flexible options to suit your needs and budget.
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </div>
                    <ul className="grid gap-3 p-4">
                      <li>
                        <NavigationMenuLink href="/landing/pricing#compare" className="block p-3 hover:bg-emerald-50 rounded-md transition-colors">
                          <BarChart className="mb-2 h-6 w-6 text-black" />
                          <h3 className="font-semibold mb-1 text-black">Compare Plans</h3>
                          <p className="text-sm text-black">Side-by-side comparison of our tiers.</p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink href="/landing/pricing#enterprise" className="block p-3 hover:bg-emerald-50 rounded-md transition-colors">
                          <FileText className="mb-2 h-6 w-6 text-black" />
                          <h3 className="font-semibold mb-1 text-black">Enterprise Solutions</h3>
                          <p className="text-sm text-black">Custom plans for large-scale operations.</p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink href="/docs" className="flex p-3 hover:bg-emerald-50 rounded-md transition-colors">
                        <Image src="/docs.png" alt="Docs" width={90} height={90} className="mr-3 rounded-lg" />
                        <div className="flex flex-col">
                          <h3 className="font-bold mb-1 text-black">View Docs</h3>
                          <p className="text-sm text-muted-foreground">Comprehensive guides and API references.</p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Changelog</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink href="/landing/changelog" className="flex p-3 hover:bg-emerald-50 rounded-md transition-colors">
                        <Image src="/changelog.png" alt="Docs" width={90} height={90} className="mr-3 rounded-lg" />
                        <div className="flex flex-col">
                          <h3 className="font-bold mb-1 text-black">View Changelog</h3>
                          <p className="text-sm text-muted-foreground">Stay updated with the latest features, improvements, and bug fixes.</p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink href="/landing/blog" className="flex p-3 hover:bg-emerald-50 rounded-md transition-colors">
                        <Image src="/blog.png" alt="Docs" width={90} height={90} className="mr-3 rounded-lg" />
                        <div className="flex flex-col">
                          <h3 className="font-bold mb-1 text-black">Read Blog</h3>
                          <p className="text-sm text-muted-foreground">Discover insights, tutorials, and news about AI and machine learning.</p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Show mobile menu button on small screens */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Hide Dashboard button on small screens */}
        <div className="hidden md:block">
          <Link href="/">
            <ShinyButton>Dashboard</ShinyButton>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white mt-2 p-4 rounded-lg shadow-lg">
          <nav className="flex flex-col space-y-2">
            <Link href="/landing/pricing" className="text-gray-600 hover:text-emerald-400">Pricing</Link>
            <Link href="/docs" className="text-gray-600 hover:text-emerald-400">Documentation</Link>
            <Link href="/landing/changelog" className="text-gray-600 hover:text-emerald-400">Changelog</Link>
            <Link href="/landing/blog" className="text-gray-600 hover:text-emerald-400">Blog</Link>
            <Link href="/" className="text-emerald-400 font-semibold">Dashboard</Link>
          </nav>
        </div>
      )}
    </header>
  )
}