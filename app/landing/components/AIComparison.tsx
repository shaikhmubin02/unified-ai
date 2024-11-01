"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function AIComparison() {
  const comparisons = [
    {
      title: "Cost Efficiency",
      description: "Save up to 25% compared to major AI providers while getting more features",
      highlight: "25% Lower Cost",
      icon: "💰"
    },
    {
      title: "No Usage Limits",
      description: "Unlike OpenAI and Anthropic, we offer truly unlimited API calls",
      highlight: "Unlimited Usage",
      icon: "∞"
    },
    {
      title: "Advanced Integration",
      description: "Custom AI solutions that seamlessly integrate with your existing workflow",
      highlight: "Seamless Setup",
      icon: "🔄"
    }
  ]

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our AI Solution?
              <Sparkles className="inline-block ml-2 text-yellow-400" />
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience enterprise-grade AI capabilities at a fraction of the cost
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-6 h-full border border-gray-800 hover:border-blue-500 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="text-blue-400 font-semibold">{item.highlight}</div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 