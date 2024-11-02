import Link from 'next/link'
import Image from 'next/image';
import React from 'react';
import { Github, Linkedin, Twitter, MessageCircle, Sparkles} from 'lucide-react'

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
  <footer className={`bg-[#0e1011] text-gray-400 py-12 w-full ${className}`}>
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-12 md:mb-0">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-none text-black p-1 rounded-lg -ml-1">
                <Image src="/logo.png" alt="Unified AI" width={34} height={34} className='animate-logo-spin origin-center' />
              </div>
              <span className="text-xl font-semibold">Unified AI</span>
            </div>
            <p className="text-sm mb-2">Empowering curiosity with AI-driven research assistance.</p>
            <p className="text-sm">&copy; copyright Unified AI 2024. All rights reserved.</p>
            <div className="flex space-x-6 mt-4">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Socials</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Register</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Sign Up</a></li>
                <li><a href="#" className="hover:text-white">Login</a></li>
                <li><a href="#" className="hover:text-white">Book a demo</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* STARTUP Text with light color effect */}
        <div className="mt-20 relative overflow-hidden">
          <h1 className="text-[10rem] font-bold text-center tracking-wide leading-none select-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none'
              }}>
            Unified AI
          </h1>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1011] via-transparent to-[#0e1011] pointer-events-none"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
