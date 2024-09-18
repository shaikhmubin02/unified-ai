import { Video } from "lucide-react";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/animated-grid-pattern";

export default function LandingContent() {
    return (
      <>
        <main className="container mx-auto px-4 pt-36 pb-20 text-center min-h-[90vh] flex items-center">
        <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-emerald-400">Neuron AI:</span> Your Intelligent
            <br />
            Research Assistant
          </h1>
          <p className="text-xl text-zinc-600">
            Accelerate your learning and discovery with AI-powered insights 🧠
          </p>
          <p className="text-lg text-zinc-600">
            Ask questions, get summaries, and explore topics deeply
            <br />
            with our advanced natural language processing 🚀
          </p>
          <button className="px-6 py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
            Start Exploring for Free
          </button>
        </div>
      </main>

      <section className="py-16 bg-white text-black mx-8 sm:mx-12 md:mx-16 lg:mx-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-emerald-400">
                Instant answers to your questions.
              </h2>
              <p className="text-lg text-gray-600">
                Neuron AI provides accurate and up-to-date information on any topic, powered by advanced language models and real-time web search.
              </p>
              <p className="text-lg text-gray-600">
                Get concise summaries, in-depth explanations, and relevant sources for all your queries{' '}
                <span role="img" aria-label="lightbulb">
                  💡
                </span>
                .
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                <Video className="w-16 h-16 text-emerald-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-black mx-8 sm:mx-12 md:mx-16 lg:mx-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-emerald-400">
                Dive deep into any topic.
              </h2>
              <p className="text-lg text-gray-600">
                Explore complex subjects with Neuron AI's advanced knowledge graph. Our AI understands context and relationships between concepts.
              </p>
              <p className="text-lg text-gray-600">
                Discover connections, follow your curiosity, and gain comprehensive insights on any subject{' '}
                <span role="img" aria-label="magnifying-glass">
                  🔍
                </span>
                .
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
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
      </section>

      <section className="py-16 bg-white mx-8 sm:mx-12 md:mx-16 lg:mx-24 mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Real-time Information</h3>
              <p className="text-gray-600">Access up-to-date information from reliable sources across the web.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Natural Language Understanding</h3>
              <p className="text-gray-600">Ask questions in plain language and receive human-like responses.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <svg className="w-12 h-12 text-emerald-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Source Attribution</h3>
              <p className="text-gray-600">Get transparent source information for all answers and summaries.</p>
            </div>
          </div>
        </div>
      </section>
      </>
    )
  }