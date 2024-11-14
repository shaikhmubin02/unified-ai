'use client'

import React, { useState } from 'react'

const Pricing = () => {

  const [isAnnual, setIsAnnual] = useState(false);

  const togglePricing = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <section className="min-h-screen bg-[#0e1011] text-gray-200 pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 mt-10">
          Supercharge your AI-powered<br />research today.
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 p-1 rounded-full">
            <button 
              className={`px-4 py-2 rounded-full ${!isAnnual ? 'bg-emerald-500 text-white' : 'text-gray-400'}`}
              onClick={togglePricing}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${isAnnual ? 'bg-emerald-500 text-white' : 'text-gray-400'}`}
              onClick={togglePricing}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="bg-emerald-500/10 p-4 rounded-lg mb-8 flex justify-between items-center">
          <p className="text-emerald-400">Early bird offer: Get a discount forever</p>
          <p className="text-emerald-400 font-bold">20% off</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="bg-[#0e1011] rounded-lg p-6 shadow-sm border-[0.2px] border-gray-700 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for getting started</p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">${isAnnual ? '182' : '19'}<span className="text-lg font-normal">/month</span></p>
              <p className="text-emerald-600 dark:text-emerald-400">
                {isAnnual ? 'Billed annually' : '$182 billed annually'}
              </p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>100 queries per month</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Basic AI model access</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Community support</span>
              </li>
            </ul>
            <button className="w-full py-2 px-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#0e1011] rounded-lg p-6 shadow-sm border-2 border-emerald-500 relative hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-2 py-1 text-sm rounded-bl-lg">Popular</div>
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">For serious researchers</p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">
                ${isAnnual ? '278' : '29'}<span className="text-lg font-normal">/month</span>
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                {isAnnual ? 'Billed annually' : '$278 billed annually'}
              </p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Unlimited queries</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Advanced AI model access</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Custom integrations</span>
              </li>
            </ul>
            <button className="w-full py-2 px-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">Upgrade to Pro</button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#0e1011] rounded-lg p-6 shadow-sm border-[0.2px] border-gray-700 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">For organizations and teams</p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">Custom</p>
              <p className="text-gray-600 dark:text-gray-400">Tailored to your needs</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Custom AI model training</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>SLA and premium support</span>
              </li>
            </ul>
            <button className="w-full py-2 px-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing