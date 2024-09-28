'use client'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Search, Settings, Zap, PlayCircle, Keyboard, CheckSquare, Database, FileText, GitBranch, ChevronRight, ExternalLink, Sparkles, ChevronLeft, Menu, Sun } from 'lucide-react';
import Footer from '../landing/components/Footer';

export default function DocumentationSection() {
  const [activeSection, setActiveSection] = useState('core-features');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black py-4 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <Sparkles className="h-6 w-6 text-emerald-500" />
          <span className="font-bold text-xl hidden sm:inline">Neuron AI</span>
          <span className="text-emerald-500 hidden sm:inline">Docs</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="sm:hidden text-gray-500 hover:text-emerald-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <a href="/landing" className="text-gray-500 hover:text-emerald-500 transition-colors hidden sm:inline-block">
            <ChevronLeft />
          </a>
          <a href="/" className="text-gray-500 hover:text-emerald-500 transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search docs"
              className="bg-gray-100 text-gray-900 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
            <Search className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </header>
      <div className="flex flex-col sm:flex-row">
        <nav className={`w-full sm:w-64 p-6 border-r border-gray-200 dark:border-gray-700 h-auto sm:h-[calc(100vh-4rem)] overflow-y-auto ${isMobileMenuOpen ? 'block' : 'hidden'} sm:block`}>
          <div className="space-y-4">
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'core-features' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('core-features')}
            >
              <Settings className="h-5 w-5" />
              <span>Core Features</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'quickstart' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('quickstart')}
            >
              <Zap className="h-5 w-5" />
              <span>Quickstart</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'demos' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('demos')}
            >
              <PlayCircle className="h-5 w-5" />
              <span>Demos</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'shortcuts' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('shortcuts')}
            >
              <Keyboard className="h-5 w-5" />
              <span>Shortcuts</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'autocomplete' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('autocomplete')}
            >
              <CheckSquare className="h-5 w-5" />
              <span>Autocomplete</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'context' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('context')}
            >
              <Database className="h-5 w-5" />
              <span>Context</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center space-x-2 ${activeSection === 'use-cases' ? 'text-emerald-500' : 'text-gray-600 hover:text-emerald-500'} transition-colors`}
              onClick={() => setActiveSection('use-cases')}
            >
              <FileText className="h-5 w-5" />
              <span>Use Cases</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-500 transition-colors">
              <GitBranch className="h-5 w-5" />
              <span>Changelog</span>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-500 transition-colors">
              <Sun className="h-5 w-5" />
              <span>Contributing</span>
            </a>
          </div>
        </nav>
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto h-[calc(100vh-4rem)] bg-white dark:bg-black">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <a href="#" className="hover:text-emerald-500 transition-colors">Home</a>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>{activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
            </div>
            <h1 className="text-4xl font-bold mb-6 flex items-center">
              <Settings className="h-10 w-10 mr-4 text-emerald-500" />
              {activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
            <div className="prose prose-emerald dark:prose-invert max-w-none">
              <p>Welcome to the Neuron AI documentation. Here you&apos;ll find comprehensive guides and documentation to help you start working with Neuron AI as quickly as possible, as well as support if you get stuck. Let&apos;s jump right in!</p>
              <h2>Getting Started</h2>
              <p>To get started with Neuron AI, you&apos;ll need to...</p>
              {/* Add more content here based on the active section */}
            </div>
          </div>
        </main>
      </div>
      <hr className="border-t border-gray-200 dark:border-gray-700" />
      <Footer />
    </div>
  );
}