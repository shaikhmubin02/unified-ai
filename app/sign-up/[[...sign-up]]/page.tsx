'use client'

import { SignUp } from '@clerk/nextjs'
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Stars from '@/components/ui/stars'

export default function Page() {
  return ( 
    <div className="relative min-h-screen flex items-center justify-center bg-[#0e1011]">
      {/* 3D Stars Background */}
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

      {/* Sign In Component */}
      <div className="relative z-10">
        <SignUp />
      </div>
    </div>
  )
}