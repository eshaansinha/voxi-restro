'use client'

import { useEffect, useState, Ref } from 'react'
import { ChevronDown } from 'lucide-react'

interface InteractiveDemoSectionProps {
  demoButtonRef?: Ref<HTMLDivElement>
}

export default function InteractiveDemoSection({ demoButtonRef }: InteractiveDemoSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animateSoundwave, setAnimateSoundwave] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full bg-primary text-primary-foreground px-4 md:px-8 py-20 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Animated Soundwave Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 bg-accent rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  height: animateSoundwave ? '2px' : '20px',
                  width: animateSoundwave ? '2px' : '20px',
                  transform: `translate(-50%, -50%) rotate(${(i / 15) * 360}deg) translateY(-80px)`,
                  animation: animateSoundwave ? `pulse-glow 2s ease-in-out infinite` : 'none',
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Section Headline */}
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Turn every call into cash.
          </h2>
          <p className={`text-2xl md:text-3xl font-bold text-accent text-center mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Try it right now.
          </p>

          {/* Subtext */}
          <p className={`text-lg text-center text-gray-300 mb-16 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Tap the microphone below to test Voxy. Play the role of a difficult customer ordering a pizza. See how it handles the pressure.
          </p>

          {/* Animated Arrow pointing to floating button */}
          <div className={`flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-sm mb-4">Tap below</div>
              <ChevronDown className="w-8 h-8 text-accent animate-arrow-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
