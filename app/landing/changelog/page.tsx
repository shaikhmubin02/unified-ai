'use client';

import Image from "next/image";

export default function Changelog() {
    return (
        <div className="bg-[#0e1011] text-white min-h-screen">
            <div className="h-16"></div> {/* This creates white space at the top */}
            <section className="py-12 mx-4 sm:mx-6 md:mx-8 lg:mx-16 pt-24">
                <div className="container mx-auto px-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-400 mb-12">Change Logs</h2>
                    
                    <div className="space-y-12">
                        {/* v1.0.0 */}
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 pr-0 md:pr-6 text-left md:text-right mb-4 md:mb-0">
                                <div className="inline-flex items-center justify-center w-10 h-10 text-green-400 font-bold mb-1 text-sm">
                                    v1.0.0
                                </div>
                                <p className="text-gray-400 text-xs">30 August 2024</p>
                            </div>
                            <div className="w-full md:w-3/4 border-l-0 md:border-l border-gray-700 pl-0 md:pl-6 pb-6 relative">
                                <div className="hidden md:block absolute top-0 left-0 w-2 h-2 -ml-1 rounded-full bg-gray-700"></div>
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-3 flex items-center">
                                            🚀Neuron AI v1.0.0 - The Cupertino v1 Launch
                                        </h3>
                                        <p className="text-emerald-400 mb-3 text-sm">Welcome to the future of AI-assisted research</p>
                                        <ul className="space-y-1 text-sm">
                                            <li className="flex items-center">👤 Onboarding revamp</li>
                                            <li className="flex items-center">🔧 Fixed &quot;Continue generating&quot; feature</li>
                                            <li className="flex items-center">🖥️ Model Choice on Neuron AI Server</li>
                                            <li className="flex items-center">⌨️ Improved shortcuts</li>
                                            <li className="flex items-center">❓ Improved help window</li>
                                            <li className="flex items-center">🎁 Enabled free trials</li>
                                            <li className="flex items-center">🌐 Server improvements, added prompt caching</li>
                                            <li className="flex items-center">🚀 Launched to public!</li>
                                        </ul>
                                    </div>
                                    <div className="mt-4 md:mt-0 md:ml-3 lg:mr-12 flex-shrink-0">
                                        <Image src="/landing.png" height={150} width={225} alt="Neuron AI v1.0.0 Preview" className="w-full md:w-auto rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
  
                        {/* v0.0.3 */}
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 pr-0 md:pr-6 text-left md:text-right mb-4 md:mb-0">
                                <div className="inline-flex items-center justify-center w-10 h-10 text-green-400 font-bold mb-1 text-sm">
                                    v0.0.3
                                </div>
                                <p className="text-gray-400 text-xs">19 August 2024</p>
                            </div>
                            <div className="w-full md:w-3/4 border-l-0 md:border-l border-gray-700 pl-0 md:pl-6 pb-6 relative">
                                <div className="hidden md:block absolute top-0 left-0 w-2 h-2 -ml-1 rounded-full bg-gray-700"></div>
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-3 flex items-center">
                                            <span className="mr-2 text-yellow-400">⚡</span>
                                            Model switch feature &amp; Bug Fixes
                                        </h3>
                                        <ul className="space-y-1 text-sm">
                                            <li className="flex items-center">💻 Huge refactor & Performance improvements</li>
                                            <li className="flex items-center">🖥️ Added Mistral AI support</li>
                                            <li className="flex items-center">🔄 Easy model switching</li>
                                            <li className="flex items-center">⚙️ Settings page revamp</li>
                                            <li className="flex items-center">📄 Added FAQ Page</li>
                                            <li className="flex items-center">⌨️ CMD+I context + options improved</li>
                                            <li className="flex items-center">🔍 @codebase searching enhanced</li>
                                            <li className="flex items-center">🔄 Neuron AI token refresh bug fixed</li>
                                            <li className="flex items-center">👤 Onboarding flow revamp</li>
                                        </ul>
                                    </div>
                                    <div className="mt-4 md:mt-0 md:ml-3 lg:mr-12 flex-shrink-0">
                                        <Image src="/landing.png" height={150} width={225} alt="Neuron AI v1.0.0 Preview" className="w-full md:w-auto rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}