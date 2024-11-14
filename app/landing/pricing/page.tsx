'use client'

import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import Image from 'next/image';
import { Box } from 'lucide-react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const prices = {
    starter: {
      monthly: 19,
      yearly: 182,  // 19 * 12 * 0.8 = 182.40 (rounded down)
    },
    pro: {
      monthly: 29,
      yearly: 278,  // 29 * 12 * 0.8 = 278.40 (rounded down)
    }
  };

  const competitorPrices = {
    chatgpt: 20,
    claude: 20,
    gemini: 23,
    others: 20
  };

  const totalCompetitorCost = Object.values(competitorPrices).reduce((a, b) => a + b, 0);

  return (
    <section className="py-24 bg-[#0e1011] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4 inline-block border border-emerald-500/20">
            PRICING
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get started for free. No credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-base ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
            >
              <span 
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-emerald-500 transition-transform duration-200 ease-in-out",
                  isYearly ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={`text-base ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly
              <span className="ml-1.5 inline-block text-xs text-emerald-500 font-medium">
                (Save 20%)
              </span>
            </span>
          </div>
        </div>

        {/* Comparison Section with Images */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Why Choose Our Platform?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-gray-400">Individual AI Platform Costs:</p>
                <ul className="space-y-2">
                  <li className="flex justify-between text-gray-300 items-center">
                    <span className="flex items-center gap-2">
                      <Image 
                        src="/chatgpt.jpg" 
                        alt="ChatGPT" 
                        width={20} 
                        height={20} 
                        className="rounded-sm"
                      />
                      ChatGPT Plus
                    </span>
                    <span>${competitorPrices.chatgpt}/mo</span>
                  </li>
                  <li className="flex justify-between text-gray-300 items-center">
                    <span className="flex items-center gap-2">
                      <Image 
                        src="/claude.png" 
                        alt="Claude" 
                        width={20} 
                        height={20}
                        className="rounded-sm"
                      />
                      Claude Pro
                    </span>
                    <span>${competitorPrices.claude}/mo</span>
                  </li>
                  <li className="flex justify-between text-gray-300 items-center">
                    <span className="flex items-center gap-2">
                      <Image 
                        src="/gemini-logo.png" 
                        alt="Gemini" 
                        width={20} 
                        height={20}
                        className="rounded-sm"
                      />
                      Gemini Advanced
                    </span>
                    <span>${competitorPrices.gemini}/mo</span>
                  </li>
                  <li className="flex justify-between text-gray-300 items-center">
                    <span className="flex items-center gap-2">
                     <Box className="w-5 h-5 text-black bg-white rounded-sm" />
                      Other AI Services
                    </span>
                    <span>${competitorPrices.others}/mo</span>
                  </li>
                  <li className="flex justify-between text-white font-semibold pt-2 border-t border-gray-700">
                    <span>Total Cost</span>
                    <span>${totalCompetitorCost}/mo</span>
                  </li>
                </ul>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                <h4 className="text-emerald-500 font-semibold mb-2">Our Platform Advantage</h4>
                <p className="text-gray-300 mb-3">Get access to all AI models for just:</p>
                <p className="text-3xl font-bold text-emerald-400 mb-2">${prices.pro.monthly}/mo</p>
                <p className="text-gray-400 text-sm">Save up to ${totalCompetitorCost - prices.pro.monthly} monthly compared to individual subscriptions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mx-4 sm:mx-8 lg:mx-16">
          {/* Decorative elements */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/30 rounded-full blur-[128px]" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/30 rounded-full blur-[128px]" />

          {/* Starter Plan */}
          <div className="relative bg-gradient-to-b from-gray-900/80 to-gray-950 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group hover:-translate-y-1">
            <div className="absolute inset-x-0 h-px -top-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
            <div className="text-emerald-400 text-4xl font-bold mb-6 flex items-baseline">
              ${isYearly ? prices.starter.yearly : prices.starter.monthly}
              <span className="text-lg text-gray-500 font-normal">
                /{isYearly ? 'yr' : 'mo'}
              </span>
            </div>
            <p className="text-gray-400 mb-6">Perfect for individual AI enthusiasts</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300 group-hover:text-gray-200">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access to ChatGPT & Gemini
              </li>
              <li className="flex items-center text-gray-300 group-hover:text-gray-200">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited messages
              </li>
              <li className="flex items-center text-gray-300 group-hover:text-gray-200">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Basic features
              </li>
              <li className="flex items-center text-gray-300 group-hover:text-gray-200">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Standard support
              </li>
            </ul>
            <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-500 font-semibold border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-950 rounded-2xl p-8 border border-emerald-500 transform scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)] group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-x-0 h-px -top-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="text-emerald-400 text-4xl font-bold mb-6 flex items-baseline">
              ${isYearly ? prices.pro.yearly : prices.pro.monthly}
              <span className="text-lg text-gray-400 font-normal">
                /{isYearly ? 'yr' : 'mo'}
              </span>
            </div>
            <p className="text-gray-200 mb-6">Best for power users and teams</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-200 group-hover:text-white">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access to All AI Models (ChatGPT, Claude, Gemini & More)
              </li>
              <li className="flex items-center text-gray-200 group-hover:text-white">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Compare AI Model Responses
              </li>
              <li className="flex items-center text-gray-200 group-hover:text-white">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced features & plugins
              </li>
              <li className="flex items-center text-gray-200 group-hover:text-white">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </ul>
            <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              Get Started
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="relative bg-gradient-to-b from-gray-900/80 to-gray-950 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group hover:-translate-y-1">
            <div className="absolute inset-x-0 h-px -top-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
            <div className="text-emerald-400 text-4xl font-bold mb-6 flex items-baseline">
              Custom<span className="text-lg text-gray-500 font-normal">/mo</span>
            </div>
            <p className="text-gray-400 mb-6">For large organizations with custom needs</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Everything in Pro
              </li>
              <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Custom integrations
              </li>
              <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
                <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dedicated support
              </li>
            </ul>
            <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-500 font-semibold border border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              Contact Sales
            </button>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-16">
          <p className="text-gray-400">
            All plans include{" "}
            <span className="text-emerald-500">access to multiple AI models</span>,{" "}
            <span className="text-emerald-500">24/7 support</span> and a{" "}
            <span className="text-emerald-500">30-day money-back guarantee</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Pricing