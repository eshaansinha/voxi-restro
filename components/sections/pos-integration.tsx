'use client'

import { useEffect, useState, useRef } from 'react'
import { Mic, Zap, Settings } from 'lucide-react'

export default function POSIntegrationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-background text-foreground px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Headline */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Slides right into your existing tech stack.
        </h2>
        <p className={`text-lg text-center text-muted-foreground mb-16 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Zero learning curve. One API integration. Instant revenue.
        </p>

        {/* Integration Pipeline */}
        <div className={`relative transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 rounded-3xl blur-2xl pointer-events-none"></div>

          {/* Pipeline Container */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-12">
            {/* Node 1: Voxy AI */}
            <div className="flex flex-col items-center relative">
              {/* Glassmorphism Node */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/10 backdrop-blur-xl border border-accent/20 shadow-2xl w-48 h-48 flex flex-col items-center justify-center group hover:border-accent/50 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 rounded-2xl transition-colors duration-300"></div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <Mic className="w-8 h-8 text-accent mb-4" />
                  <p className="font-bold text-foreground text-lg">Voxy AI</p>
                  <p className="text-sm text-muted-foreground mt-2">Voice Processing</p>
                </div>
              </div>
            </div>

            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:flex items-center flex-1 max-w-xs h-1 relative overflow-hidden">
              {/* Dotted line background */}
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                <defs>
                  <pattern
                    id="dotted-line"
                    x="0"
                    y="0"
                    width="12"
                    height="1"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="6" cy="0.5" r="2" fill="currentColor" className="text-accent/40" />
                  </pattern>
                </defs>
                <line
                  x1="0"
                  y1="0.5"
                  x2="100%"
                  y2="0.5"
                  stroke="url(#dotted-line)"
                  strokeWidth="1"
                  className="text-accent/40"
                />
              </svg>

              {/* Animated particles flowing left to right */}
              <style>{`
                @keyframes particle-flow {
                  0% {
                    left: -8px;
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  90% {
                    opacity: 1;
                  }
                  100% {
                    left: 100%;
                    opacity: 0;
                  }
                }
                .particle {
                  animation: particle-flow 2s ease-in-out infinite;
                }
              `}</style>

              {/* Multiple particles */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="particle absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full"
                  style={{
                    animationDelay: `${i * 500}ms`,
                  }}
                />
              ))}
            </div>

            {/* Node 2: Smart Processing */}
            <div className="flex flex-col items-center relative mt-8 md:mt-0">
              {/* Glassmorphism Node */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/10 backdrop-blur-xl border border-accent/20 shadow-2xl w-48 h-48 flex flex-col items-center justify-center group hover:border-accent/50 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 rounded-2xl transition-colors duration-300 animate-pulse-glow"></div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <Zap className="w-8 h-8 text-accent mb-4" />
                  <p className="font-bold text-foreground text-lg">Smart Processing</p>
                  <p className="text-sm text-muted-foreground mt-2">Order Logic & Routing</p>
                </div>
              </div>
            </div>

            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:flex items-center flex-1 max-w-xs h-1 relative overflow-hidden">
              {/* Dotted line background */}
              <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                <defs>
                  <pattern
                    id="dotted-line-2"
                    x="0"
                    y="0"
                    width="12"
                    height="1"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="6" cy="0.5" r="2" fill="currentColor" className="text-accent/40" />
                  </pattern>
                </defs>
                <line
                  x1="0"
                  y1="0.5"
                  x2="100%"
                  y2="0.5"
                  stroke="url(#dotted-line-2)"
                  strokeWidth="1"
                  className="text-accent/40"
                />
              </svg>

              {/* Animated particles flowing left to right */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="particle absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full"
                  style={{
                    animationDelay: `${i * 500}ms`,
                  }}
                />
              ))}
            </div>

            {/* Node 3: Your POS */}
            <div className="flex flex-col items-center relative">
              {/* Glassmorphism Node */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/10 backdrop-blur-xl border border-accent/20 shadow-2xl w-48 h-48 flex flex-col items-center justify-center group hover:border-accent/50 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 rounded-2xl transition-colors duration-300"></div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <Settings className="w-8 h-8 text-accent mb-4" />
                  <p className="font-bold text-foreground text-lg">Your POS</p>
                  <p className="text-sm text-muted-foreground mt-2">Toast, Square, OpenTable</p>
                </div>
              </div>
            </div>
          </div>

          {/* POS Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-12 border-t border-accent/20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 hover:border-accent/50 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-bold text-sm text-foreground">Toast</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 hover:border-accent/50 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-bold text-sm text-foreground">OpenTable</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 hover:border-accent/50 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-bold text-sm text-foreground">Square</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 hover:border-accent/50 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-bold text-sm text-foreground">More platforms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
