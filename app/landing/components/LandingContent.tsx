'use client'

import { Video, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBeamDemo } from "./AnimatedBeamDemo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DotPattern from "@/components/ui/dot-pattern";
import { Meteors } from "@/components/ui/meteors";
import Marquee from "@/components/ui/marquee";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import ShinyButton from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.esm"
import { Suspense, useRef, useState } from "react"
import * as THREE from 'three'
import Image from 'next/image'

// Add metadata export if needed
export const metadata = {
  title: "Unified AI: Leading LLMs in One Unified Platform",
  description: "Access ChatGPT, Claude, Google's Gemini, and more - all in one place"
}

export default function LandingContent() {

  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const [searchTerm, setSearchTerm] = useState("")

  const models = [
    // OpenAI Models
    {
      name: "o1-preview",
      organization: "OpenAI",
      size: "Confidential",
      capabilities: "Advanced reasoning, chain-of-thought processing",
      useCases: "Complex problem-solving, scientific research, coding",
    },
    {
      name: "o1-mini",
      organization: "OpenAI",
      size: "Confidential",
      capabilities: "Optimized for high-speed reasoning in code tasks",
      useCases: "Real-time coding support, structured problem-solving",
    },
    {
      name: "GPT-4o",
      organization: "OpenAI",
      size: "1.8 trillion parameters",
      capabilities: "Advanced language understanding and generation",
      useCases: "Conversational agents, content creation, code generation",
    },
    {
      name: "GPT-4o mini",
      organization: "OpenAI",
      size: "1.2 trillion parameters",
      capabilities: "High-quality language tasks with reduced computational requirements",
      useCases: "Real-time applications, mobile AI solutions",
    },
    // Anthropic Models
    {
      name: "Claude 3.5 Sonnet",
      organization: "Anthropic",
      size: "Medium-sized model",
      capabilities: "Best overall performance, enhanced intelligence, balanced capabilities",
      useCases: "Creative writing, code generation, comprehensive task handling, versatile applications",
    },
    {
      name: "Claude 3 Opus",
      organization: "Anthropic",
      size: "Large, most capable research model",
      capabilities: "Complex reasoning, advanced problem-solving, nuanced understanding",
      useCases: "Scientific research, complex analysis, advanced writing tasks, intricate problem-solving",
    },
    {
      name: "Claude 3 Haiku",
      organization: "Anthropic",
      size: "Smallest/Fastest model",
      capabilities: "Quick response times, efficient for simple tasks",
      useCases: "Customer support, short-form content, rapid information retrieval",
    },
    // Google Models
    {
      name: "Gemini 1.5 Pro",
      organization: "Google",
      size: "1.5 trillion parameters",
      capabilities: "Comprehensive language understanding and generation",
      useCases: "Search enhancement, summarization, complex query handling",
    },
    {
      name: "Gemini 1.5 Flash",
      organization: "Google",
      size: "1.2 trillion parameters",
      capabilities: "High-speed language processing",
      useCases: "Real-time translation, rapid content generation",
    },
    // Meta Models
    {
      name: "Llama 3.1 405B",
      organization: "Meta",
      size: "405 billion parameters",
      capabilities: "Multimodal processing, including text and vision",
      useCases: "Image captioning, visual question answering, multimodal content generation",
    },
    {
      name: "Llama 3.2 90B",
      organization: "Meta",
      size: "90 billion parameters",
      capabilities: "Enhanced vision capabilities",
      useCases: "Image recognition, object detection, video analysis",
    },
    // Mistral AI Models
    {
      name: "Mistral Large 2",
      organization: "Mistral AI",
      size: "2 trillion parameters",
      capabilities: "Extensive language comprehension and generation",
      useCases: "Large-scale data analysis, enterprise-level AI applications",
    },
  ]

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.capabilities.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.useCases.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Add these animations inside the LandingContent component, before the return statement
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  function Stars(props: any) {
    const ref = useRef<THREE.Points>(null)
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  
    useFrame((state, delta) => {
      if (ref.current) {
        ref.current.rotation.x -= delta / 50
        ref.current.rotation.y -= delta / 75
      }
    })
  
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial
            transparent
            color="#ffffff"
            size={0.002}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
    )
  }

    return (
      <div className="relative">
        <main className="pt-36 pb-20 text-center min-h-[88vh] flex items-center relative overflow-hidden bg-[#0e1011]">
          <div className="absolute inset-0 z-0">
            <Canvas 
              camera={{ position: [0, 0, 1] }}
              style={{ background: '#0e1011' }}
            >
              <Suspense fallback={null}>
                <Stars />
              </Suspense>
            </Canvas>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <Meteors 
              number={8} 
              className="opacity-70 before:from-emerald-500 bg-emerald-500" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0e1011]/50 to-[#0e1011]" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
            <div className="absolute top-3/4 -right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />
          </div>
          <svg className="absolute top-0 right-0 w-64 h-64 text-emerald-400 opacity-30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="20%" stopColor="white" stopOpacity="1" />
                <stop offset="80%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="fadeMask">
                <rect width="100" height="100" fill="url(#fadeGradient)" />
              </mask>
            </defs>
            <g mask="url(#fadeMask)">
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`M${100 - i * 8},0 Q${95 - i * 8},${10 + i * 3} ${100},${20 + i * 6}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          </svg>
          <div className="container mx-auto px-4 max-w-3xl space-y-6 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div 
                variants={itemVariants}
                className="flex justify-center mb-8"
              >
                <div className={cn(
                  "group rounded-full border border-emerald-500/20 bg-gray-900/50 backdrop-blur-sm text-base text-white transition-all ease-in hover:cursor-pointer hover:border-emerald-500/40 hover:bg-gray-900/70",
                )}>
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-emerald-400">
                    <span className="text-sm">✨ Try Unified AI</span>
                    <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl font-bold leading-tight text-white"
              >
                <span className="inline-flex flex-wrap items-center justify-center gap-1 w-full">
                  <Image 
                    src="/logo.png" 
                    alt="Unified AI" 
                    width={38} 
                    height={38}
                  />
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent font-bold">Unified AI</span>
                  <span>: Leading LLMs in</span>
                  <span className="w-full text-center">One Unified Platform</span>
                </span>
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-zinc-300"
              >
                <span className="inline-flex items-center gap-2">
                  Access ChatGPT
                  <Image 
                    src='/chatgpt.jpg' 
                    alt="ChatGPT" 
                    width={20} 
                    height={20} 
                    className="inline-block overflow-hidden rounded-md"
                  />
                </span>, {" "}
                <span className="inline-flex items-center gap-2">
                  Claude
                  <Image 
                    src='/claude.png' 
                    alt="Claude" 
                    width={20} 
                    height={20} 
                    className="inline-block overflow-hidden rounded-md"
                  />
                </span>, {" "}
                <span className="inline-flex items-center gap-2">
                  Google&apos;s Gemini
                  <Image 
                    src='/gemini-logo.png' 
                    alt="Gemini" 
                    width={20} 
                    height={20} 
                    className="inline-block overflow-hidden rounded-md"
                  />
                </span> and more - all in one place.
              </motion.p>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-zinc-400"
              >
                It&apos;s like a party where all the cool AIs hang out, and you&apos;re invited! 🎉
              </motion.p>
              <motion.div variants={itemVariants}>
                <RainbowButton>
                  Join the AI Revolution
                </RainbowButton>
              </motion.div>
            </motion.div>
          </div>
        </main>
        
        {/* Problem Agitation Section*/}
        <section className="py-24 bg-[#0e1011] relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium inline-block border border-emerald-500/20">
                      THE CHALLENGE
                    </span>
                    <h2 className="text-4xl font-bold text-white leading-tight">
                      Tired of Juggling Multiple AI Subscriptions?
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-xl text-gray-300">
                      Managing multiple AI platforms is becoming increasingly:
                    </p>
                    <ul className="space-y-5">
                      <li className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">Expensive and Wasteful</h3>
                          <p className="text-gray-400">Paying for multiple subscriptions that overlap in functionality</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">Time-Consuming</h3>
                          <p className="text-gray-400">Constantly switching between different platforms and interfaces</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1">Context Loss</h3>
                          <p className="text-gray-400">No unified history or context between different AI interactions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-emerald-500/20">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-2xl"></div>
                      <h3 className="text-2xl font-bold text-white mb-6">The Unified AI Solution</h3>
                      <ul className="space-y-6">
                        <li className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">One Unified Subscription</h4>
                            <p className="text-gray-300">Access all major AI models through a single affordable plan</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Seamless Switching</h4>
                            <p className="text-gray-300">Switch between AI models with a single click</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Unified Context</h4>
                            <p className="text-gray-300">Maintain conversation history across all AI interactions</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Transformation section */}

        {/* Social Proof Section */}
        <section className="py-16 bg-[#0e1011] relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Join the AI Revolution
                </h2>
                <p className="text-gray-400">
                  Be among the first to experience the future of AI interaction
                </p>
              </div>
              
              {/* Early Access Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">Early</div>
                  <div className="text-gray-400">Access Benefits</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">Beta</div>
                  <div className="text-gray-400">Testing Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">24/7</div>
                  <div className="text-gray-400">Support Access</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">50%</div>
                  <div className="text-gray-400">Launch Discount</div>
                </div>
              </div>

              {/* Coming Soon Partners */}
              <div className="relative">
                <Marquee className="py-6" pauseOnHover>
                  {[
                    "Integration Coming Soon",
                    "Partnership Pending",
                    "Beta Testing",
                    "Under Development",
                    "Coming Soon",
                    "In Progress",
                    "Beta Access",
                    "Early Preview"
                  ].map((status, index) => (
                    <div key={index} className="mx-8">
                      <div className="h-12 px-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-300 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                        {status}
                      </div>
                    </div>
                  ))}
                </Marquee>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0e1011] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0e1011] to-transparent z-10" />
              </div>

              {/* Early Access CTA */}
              <div className="text-center mt-12">
                <p className="text-gray-400 mb-4">
                  Limited spots available for our exclusive beta program
                </p>
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0e1011] relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-4xl font-bold text-emerald-400">
                    Advanced AI, Simplified Access
                  </h2>
                  <p className="text-lg text-gray-300">
                    Experience ChatGPT, Claude, Google&apos;s Gemini, and other top-tier LLMs through a single platform. It&apos;s like having a Swiss Army knife, but for AI!
                  </p>
                  <p className="text-lg text-gray-300">
                    Why settle for one AI when you can have them all? It&apos;s not greed, it&apos;s efficiency! 😉
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    <Video className="w-16 h-16 text-emerald-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0e1011] relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-4xl font-bold text-emerald-400">
                    One Subscription, Unlimited Potential
                  </h2>
                  <p className="text-lg text-gray-300">
                    Say goodbye to multiple subscriptions. Our platform is like an all-you-can-eat buffet, but for AI models!
                  </p>
                  <p className="text-lg text-gray-300">
                    Leverage the strengths of each AI model. It&apos;s like having a team of super-smart interns, minus the coffee runs! ☕️
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    <svg
                      className="w-16 h-16 text-emerald-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-black opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        </section>
        
        <section className="py-24 bg-[#0e1011] relative overflow-hidden">
          <DotPattern
            className={cn(
              "absolute inset-0 h-full w-full opacity-50",
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            )}
            width={52}
            height={52}
            cx={16}
            cy={16}
            cr={2}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                One Platform, Multiple AI Powerhouses
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl">
                Unified AI brings together ChatGPT, Claude, Google&apos;s Gemini, and more in a single, intuitive interface. Experience the synergy of leading language models working in harmony.
              </p>
            </div>
            <Card className="relative w-full max-w-4xl mx-auto aspect-video mb-12 border-none bg-transparent ">
              <AnimatedBeamDemo />
            </Card>
            <div className="text-center">
              <p className="text-lg text-gray-400 mb-6">
                Unlock the full potential of AI with seamless access to multiple language models
              </p>
              <ShinyButton>Explore Unified AI Now</ShinyButton>
              
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        </section>

        <section className="py-16 bg-[#0e1011] relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
              <div className="text-center mb-12">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4 inline-block border border-emerald-500/20">
                  FEATURES
                </span>
                <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Experience the future of AI interaction with our comprehensive platform
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Existing Cards with updated content */}
                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3 text-white">Lightning-Fast Access</h3>
                  <p className="text-gray-300">Instant access to multiple AI models with zero setup time. Start conversations immediately with any AI of your choice.</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3 text-white">Smart Model Switching</h3>
                  <p className="text-gray-300">Seamlessly switch between AI models mid-conversation to leverage each model&apos;s unique strengths.</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3 text-white">Enterprise Security</h3>
                  <p className="text-gray-300">Bank-grade encryption and security measures to protect your conversations and sensitive data.</p>
                </div>

                {/* New Cards */}
                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3 text-white">Advanced Analytics</h3>
                  <p className="text-gray-300">Detailed insights into your AI usage patterns and conversation history with powerful search capabilities.</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3 text-white">Team Collaboration</h3>
                  <p className="text-gray-300">Share conversations, create team workspaces, and collaborate seamlessly with your entire organization.</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-md border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                  <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3 text-white">Custom Workflows</h3>
                  <p className="text-gray-300">Create automated workflows and integrate with your existing tools through our powerful API.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Model Comparison Section */}
        <section className="py-24 bg-[#0e1011] relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-12">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4 inline-block border border-emerald-500/20">
                MODELS
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Comprehensive AI Model Directory
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Access and compare leading AI models all in one place
              </p>
            </div>

            <Card className="bg-gray-900/50 backdrop-blur-sm border-emerald-500/20">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <CardTitle className="text-2xl font-bold text-white">Available Models</CardTitle>
                  <Input
                    placeholder="Search models, capabilities, or use cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm bg-gray-800/50 border-emerald-500/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-500/20">
                        <TableHead className="text-emerald-400">Model</TableHead>
                        <TableHead className="text-emerald-400">Organization</TableHead>
                        <TableHead className="text-emerald-400">Size</TableHead>
                        <TableHead className="text-emerald-400">Capabilities</TableHead>
                        <TableHead className="text-emerald-400">Use Cases</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredModels.map((model) => (
                        <TableRow 
                          key={model.name} 
                          className="border-emerald-500/10 hover:bg-emerald-500/5 transition-colors"
                        >
                          <TableCell className="font-medium text-white">{model.name}</TableCell>
                          <TableCell className="text-gray-300">{model.organization}</TableCell>
                          <TableCell className="text-gray-300">{model.size}</TableCell>
                          <TableCell className="text-gray-300">{model.capabilities}</TableCell>
                          <TableCell className="text-gray-300">{model.useCases}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
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
                  <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access to All AI Models
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited messages
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic features
                  </li>
                  <li className="flex items-center text-gray-300 group-hover:text-gray-200 transition-colors">
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
                  <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access to All AI Models
                  </li>
                  <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited messages
                  </li>
                  <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced features & plugins
                  </li>
                  <li className="flex items-center text-gray-200 group-hover:text-white transition-colors">
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
                <span className="text-emerald-500">24/7 support</span> and a{" "}
                <span className="text-emerald-500">30-day money-back guarantee</span>
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Future Impact Section */}
        <section className="py-24 bg-[#0e1011] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4 inline-block border border-emerald-500/20">
                THE FUTURE
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Imagine the Possibilities
              </h2>
              <p className="text-gray-400">
                Here's how Unified AI will transform your AI workflow
              </p>
            </div>

            <div className="relative">
              {/* First Marquee */}
              <Marquee className="mb-8" pauseOnHover>
                {[
                  {
                    persona: "Developer",
                    useCase: "Code Generation",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
                    content: "Compare responses from different AI models to get the best code suggestions and explanations."
                  },
                  {
                    persona: "Researcher",
                    useCase: "Data Analysis",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Research",
                    content: "Leverage multiple AI models simultaneously for comprehensive data insights and analysis."
                  },
                  {
                    persona: "Writer",
                    useCase: "Content Creation",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Writer",
                    content: "Switch between AI models to find the perfect tone and style for your content."
                  }
                ].map((useCase, index) => (
                  <div key={index} className="mx-4 w-[400px]">
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/20">
                      <div className="flex items-center mb-4">
                        <img
                          src={useCase.image}
                          alt={useCase.persona}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="text-white font-semibold">{useCase.persona}</h4>
                          <p className="text-emerald-500 text-sm">{useCase.useCase}</p>
                        </div>
                      </div>
                      <p className="text-gray-300">{useCase.content}</p>
                    </div>
                  </div>
                ))}
              </Marquee>

              {/* Second Marquee (Reverse) */}
              <Marquee reverse pauseOnHover>
                {[
                  {
                    persona: "Student",
                    useCase: "Learning Assistant",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Student",
                    content: "Get explanations in different styles to better understand complex topics."
                  },
                  {
                    persona: "Business Analyst",
                    useCase: "Market Research",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Analyst",
                    content: "Combine insights from multiple AI models for comprehensive market analysis."
                  },
                  {
                    persona: "Designer",
                    useCase: "Creative Ideation",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Designer",
                    content: "Explore different creative directions with various AI models as your brainstorming partners."
                  }
                ].map((useCase, index) => (
                  <div key={index} className="mx-4 w-[400px]">
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/20">
                      <div className="flex items-center mb-4">
                        <img
                          src={useCase.image}
                          alt={useCase.persona}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="text-white font-semibold">{useCase.persona}</h4>
                          <p className="text-emerald-500 text-sm">{useCase.useCase}</p>
                        </div>
                      </div>
                      <p className="text-gray-300">{useCase.content}</p>
                    </div>
                  </div>
                ))}
              </Marquee>

              {/* Gradient Overlays */}
              <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0e1011] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0e1011] to-transparent z-10" />
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">
                Be among the first to experience these possibilities
              </p>
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0e1011] relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24">
              <div className="text-center mb-12">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4 inline-block border border-emerald-500/20">
                  FAQ
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-400">
                  Everything you need to know about our platform
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                {[
                  {
                    question: "What makes Unified AI different from using individual AI platforms?",
                    answer: "Unified AI uniquely combines multiple AI models in one interface, allowing you to seamlessly switch between them without managing multiple subscriptions or tabs. You can leverage each model's strengths while maintaining a consistent chat history and interface."
                  },
                  {
                    question: "Can I use multiple AI models in the same conversation?",
                    answer: "Absolutely! One of our key features is the ability to switch between AI models mid-conversation. This allows you to leverage different models' strengths for various parts of your discussion, all while maintaining context."
                  },
                  {
                    question: "What kind of support do you provide for enterprise customers?",
                    answer: "Enterprise customers receive priority 24/7 support, custom integration assistance, dedicated account management, and the ability to customize AI model configurations. We also provide training sessions and detailed analytics for team usage."
                  },
                  {
                    question: "How do you handle data privacy and security?",
                    answer: "We implement enterprise-grade security measures including end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is never used for training AI models, and we offer data retention controls for enterprise customers."
                  },
                ].map((faq, index) => (
                  <div 
                    key={index}
                    className="border border-emerald-500/20 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
                    >
                      <span className="text-white font-medium">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-emerald-500 transform transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 py-4 bg-gray-900/30">
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <a href="#" className="text-emerald-500 hover:text-emerald-400 text-sm">
                  Need more help? Contact our support team →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section*/}
        <section className="py-24 bg-[#0e1011] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your AI Workflow?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who&apos;ve already simplified their AI interactions with Unified AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <ShinyButton>Get Started Free</ShinyButton>
                <Button className="bg-emerald-600 text-black hover:bg-emerald-700 transition-colors">Schedule Demo</Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    )
  }

