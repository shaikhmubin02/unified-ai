'use client'

import React, { useState } from 'react'

const Pricing = () => {

  const [isAnnual, setIsAnnual] = useState(false);

  const togglePricing = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-16 mx-8 sm:mx-12 md:mx-16 lg:mx-24 min-h-screen pt-28">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Supercharge your AI-powered<br />research today.
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-full">
            <button 
              className={`px-4 py-2 rounded-full ${!isAnnual ? 'bg-emerald-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={togglePricing}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${isAnnual ? 'bg-emerald-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={togglePricing}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900 p-4 rounded-lg mb-8 flex justify-between items-center">
          <p className="text-emerald-600 dark:text-emerald-400">Early bird offer: Get a discount forever</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold">20% off</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for getting started</p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">$0<span className="text-lg font-normal">/month</span></p>
              <p className="text-gray-600 dark:text-gray-400">No credit card required</p>
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
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border-2 border-emerald-500 relative">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-2 py-1 text-sm rounded-bl-lg">Popular</div>
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">For serious researchers</p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">
                ${isAnnual ? '15' : '19'}<span className="text-lg font-normal">/month</span>
              </p>
              <p className="text-emerald-600 dark:text-emerald-400">
                {isAnnual ? 'Billed annually' : '$228 billed annually'}
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
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
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