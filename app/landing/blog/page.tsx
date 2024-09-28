'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { useTheme } from 'next-themes'

interface BlogPost {
  id: string
  image: string
  date: string
  title: string
  description: string
  category: string
  content: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    image: '/landing.png',
    date: 'September 15, 2024',
    title: 'Revolutionizing Academic Research with Neuron AI',
    description: 'Discover how Neuron AI is transforming the way researchers access and analyze information, leading to breakthrough discoveries.',
    category: 'AI Technology',
    content: `
      <p>In the ever-evolving landscape of academic research, the introduction of Neuron AI marks a significant milestone. This cutting-edge AI-powered research assistant is revolutionizing how scholars and researchers approach their work, offering unprecedented access to information and analytical capabilities.</p>

      <h3>Streamlining Literature Reviews</h3>
      <p>One of the most time-consuming aspects of research is the literature review process. Neuron AI simplifies this by quickly scanning and summarizing vast amounts of academic papers, highlighting key findings, methodologies, and conclusions. This not only saves time but also ensures that researchers don't miss crucial information.</p>

      <h3>Enhanced Data Analysis</h3>
      <p>Neuron AI's advanced algorithms can process complex datasets, identifying patterns and correlations that might be overlooked by human researchers. This capability is particularly valuable in fields like genomics, climate science, and social studies, where large datasets are common.</p>

      <h3>Cross-Disciplinary Insights</h3>
      <p>By leveraging its vast knowledge base spanning multiple disciplines, Neuron AI can suggest unexpected connections between different fields of study. This cross-pollination of ideas often leads to innovative approaches and breakthrough discoveries.</p>

      <h3>Real-Time Collaboration</h3>
      <p>Neuron AI facilitates seamless collaboration among researchers across the globe. Its ability to translate and summarize research in multiple languages breaks down language barriers, fostering truly global scientific cooperation.</p>

      <h3>The Future of Research</h3>
      <p>As Neuron AI continues to evolve, it promises to accelerate the pace of scientific discovery and academic progress. By automating time-consuming tasks and providing powerful analytical tools, it allows researchers to focus on what they do best: asking the right questions and interpreting results to push the boundaries of human knowledge.</p>

      <p>While Neuron AI is a powerful tool, it's important to note that it's designed to augment human intelligence, not replace it. The critical thinking, creativity, and intuition of human researchers remain irreplaceable in the pursuit of knowledge.</p>
    `
  },
  {
    id: '2',
    image: '/landing.png',
    date: 'September 1, 2024',
    title: 'Ensuring Data Privacy and Security in AI-Assisted Research',
    description: 'Learn about Neuron AI\'s advanced security measures that protect your sensitive research data while leveraging powerful AI capabilities.',
    category: 'Security',
    content: `
      <p>As AI becomes increasingly integrated into academic and scientific research, concerns about data privacy and security are at the forefront of many researchers' minds. At Neuron AI, we understand the critical importance of protecting sensitive research data. This blog post outlines the robust security measures we've implemented to ensure the confidentiality and integrity of your research.</p>

      <h3>End-to-End Encryption</h3>
      <p>All data transmitted to and from Neuron AI is protected with state-of-the-art end-to-end encryption. This ensures that your research data remains confidential and cannot be intercepted or accessed by unauthorized parties during transmission.</p>

      <h3>Secure Data Storage</h3>
      <p>We use advanced data storage systems with multiple layers of security. All stored data is encrypted, and access is strictly controlled and monitored. Our storage systems are regularly audited and updated to maintain the highest levels of security.</p>

      <h3>Anonymization and Pseudonymization</h3>
      <p>Neuron AI employs sophisticated techniques to anonymize and pseudonymize sensitive data. This allows our AI to process and analyze information without compromising individual privacy or confidentiality.</p>

      <h3>Strict Access Controls</h3>
      <p>We implement rigorous access controls to ensure that only authorized personnel can access sensitive systems and data. This includes multi-factor authentication, regular security training for our staff, and comprehensive logging and monitoring of all system access.</p>

      <h3>Compliance with Global Standards</h3>
      <p>Neuron AI is compliant with international data protection regulations, including GDPR, CCPA, and HIPAA. We regularly review and update our policies and procedures to ensure ongoing compliance with evolving global standards.</p>

      <h3>Transparent Data Usage</h3>
      <p>We believe in complete transparency regarding how your data is used. Our AI models are trained on anonymized datasets, and we never use individual research data for purposes other than those explicitly authorized by our users.</p>

      <h3>Regular Security Audits</h3>
      <p>We conduct regular internal and external security audits to identify and address potential vulnerabilities. This proactive approach helps us maintain a robust security posture and stay ahead of emerging threats.</p>

      <p>At Neuron AI, we're committed to advancing research while maintaining the highest standards of data privacy and security. By implementing these measures, we aim to provide researchers with a powerful AI assistant they can trust with their most sensitive data.</p>
    `
  },
  {
    id: '3',
    image: '/landing.png',
    date: 'August 20, 2024',
    title: 'The Future of Academic Publishing with AI',
    description: 'Explore how Neuron AI is reshaping the landscape of academic publishing, from peer review to open access.',
    category: 'Future Trends',
    content: `
      <p>The academic publishing industry is on the brink of a major transformation, driven by advancements in AI technology. Neuron AI is at the forefront of this revolution, offering tools and capabilities that are reshaping every aspect of the publishing process. Let's explore how AI is influencing the future of academic publishing.</p>

      <h3>AI-Assisted Peer Review</h3>
      <p>One of the most time-consuming aspects of academic publishing is the peer review process. Neuron AI is streamlining this by:</p>
      <ul>
        <li>Automatically checking for plagiarism and data fabrication</li>
        <li>Suggesting appropriate reviewers based on expertise matching</li>
        <li>Providing initial assessments of methodology and statistical analysis</li>
        <li>Highlighting potential conflicts of interest</li>
      </ul>
      <p>While AI doesn't replace human reviewers, it significantly reduces their workload and helps maintain the integrity of the peer review process.</p>

      <h3>Enhanced Manuscript Preparation</h3>
      <p>Neuron AI offers tools to help researchers prepare their manuscripts more effectively:</p>
      <ul>
        <li>Automated formatting according to journal guidelines</li>
        <li>Citation checking and suggestion</li>
        <li>Language polishing and style consistency</li>
        <li>Visualizations of complex data</li>
      </ul>
      <p>These features not only save time but also improve the overall quality of submissions.</p>

      <h3>Intelligent Content Discovery</h3>
      <p>With the vast amount of research being published, finding relevant papers can be challenging. Neuron AI's advanced algorithms help by:</p>
      <ul>
        <li>Providing personalized article recommendations</li>
        <li>Summarizing key findings from multiple papers</li>
        <li>Identifying emerging trends in specific fields</li>
        <li>Connecting researchers with similar interests</li>
      </ul>

      <h3>Open Access and Preprint Servers</h3>
      <p>AI is playing a crucial role in the growth of open access publishing and preprint servers. Neuron AI contributes by:</p>
      <ul>
        <li>Automating the process of depositing articles in appropriate repositories</li>
        <li>Tracking article versions and updates</li>
        <li>Facilitating community feedback and discussion on preprints</li>
        <li>Analyzing the impact of open access articles</li>
      </ul>

      <h3>Ethical Considerations</h3>
      <p>As AI becomes more integrated into academic publishing, it's crucial to address ethical considerations:</p>
      <ul>
        <li>Ensuring transparency in AI-assisted processes</li>
        <li>Maintaining human oversight in critical decisions</li>
        <li>Addressing potential biases in AI algorithms</li>
        <li>Protecting author and reviewer privacy</li>
      </ul>

      <p>The future of academic publishing with AI is bright, promising increased efficiency, improved quality, and broader access to scientific knowledge. As Neuron AI continues to evolve, we're committed to working closely with researchers, publishers, and institutions to shape a future where technology enhances the dissemination of knowledge while upholding the highest standards of academic integrity.</p>
    `
  }
]

function BlogPost({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <div className="bg-white dark:bg-black rounded-lg dark:border-gray-700 border-[0.2px] overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 h-full flex flex-col">
        <div className="relative w-full pt-[50%] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {post.category}
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-1">{post.date}</p>
            <h2 className="text-base font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">{post.description}</p>
          </div>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
            Read More <ArrowRight className="ml-1 w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function addSpacingBetweenParagraphs(content: string): string {
  return content.replace(/<\/p>\s*<p>/g, '</p><br /><p>');
}

function BlogDialog({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const processedContent = addSpacingBetweenParagraphs(post.content);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
        onClick={handleOverlayClick}
      >
        <div className="bg-white dark:bg-black rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
          <div className="relative w-full pt-[40%]">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-2">{post.date}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200">{post.title}</h2>
            <div className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
              {post.category}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-6">{post.description}</p>
            <div 
              className="prose prose-sm md:prose-base max-w-none text-gray-700 dark:text-gray-300 [&>p]:mb-4 dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200 pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 mt-10">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">Stay updated with the latest in AI-powered research assistance</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogPost key={post.id} post={post} onClick={() => setSelectedPost(post)} />
          ))}
        </div>
      </div>
      {selectedPost && (
        <BlogDialog post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  )
}