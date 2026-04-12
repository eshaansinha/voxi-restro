'use client'

import { useEffect, useState, useRef } from 'react'
import { Phone, Users, MapPin, Smile } from 'lucide-react'

export default function UnfairAdvantageSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
    <section ref={sectionRef} className="relative w-full bg-gray-50 text-gray-900 px-4 md:px-8 py-20 md:py-32 overflow-hidden border-t border-gray-200">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Headline */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
            The Unfair Advantage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            What makes Voxy different—and unstoppable.
          </p>
        </div>

        {/* Rich Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Never on Hold */}
          <div className={`group relative bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgb(255,107,53,0.1)] hover:border-accent/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            
            {/* Unified Mini-UI: Live Call */}
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl w-fit inline-flex items-center gap-3 shadow-sm">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-emerald-600 font-mono text-sm font-bold tracking-wide uppercase">HOLD TIME: 00:00</span>
            </div>

            <Phone className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Never put a customer on hold.</h3>
            <p className="text-gray-600 leading-relaxed">
              Handles unlimited simultaneous calls during the Friday rush. Quotes wait times, sends directions, and takes orders instantly.
            </p>
          </div>

          {/* Card 2: No Frustration / Patience */}
          <div className={`group relative bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgb(255,107,53,0.1)] hover:border-accent/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            
            {/* Unified Mini-UI: Audio Waveform Processing */}
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl w-fit inline-flex items-center gap-3 shadow-sm">
              <div className="flex gap-1 items-end h-4">
                <div className="w-1 bg-blue-500 rounded-full animate-pulse h-2"></div>
                <div className="w-1 bg-blue-500 rounded-full animate-pulse h-4" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 bg-blue-500 rounded-full animate-pulse h-3" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-blue-600 font-mono text-sm font-bold tracking-wide uppercase">STATUS: INFINITE PATIENCE</span>
            </div>

            <Smile className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Zero Frustration, No Exceptions.</h3>
            <p className="text-gray-600 leading-relaxed">
              Unlike human staff, Voxy never has a "bad day." It handles every single guest with total patience, clarity, and kindness—no matter how difficult the caller is.
            </p>
          </div>

          {/* Card 3: Delivery Location Checks */}
          <div className={`group relative bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgb(255,107,53,0.1)] hover:border-accent/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            
            {/* Unified Mini-UI: Radar Ping */}
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl w-fit inline-flex items-center gap-3 shadow-sm">
              <div className="relative flex items-center justify-center h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50"></span>
                <MapPin className="relative z-10 w-4 h-4 text-accent" />
              </div>
              <span className="text-accent font-mono text-sm font-bold tracking-wide uppercase">RADIUS VERIFIED: 5.0 MI</span>
            </div>

            <MapPin className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Automated Location Checks.</h3>
            <p className="text-gray-600 leading-relaxed">
              Voxy instantly verifies if a caller is within your delivery zone before they waste 5 minutes ordering. It eliminates delivery disputes before they happen.
            </p>
          </div>

          {/* Card 4: Supercharge FOH */}
          <div className={`group relative bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgb(255,107,53,0.1)] hover:border-accent/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            
            {/* Unified Mini-UI: Throbbing Progress Bar */}
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-2xl w-fit inline-flex items-center gap-3 shadow-sm">
              <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden flex">
                <div className="h-full w-full bg-accent rounded-full animate-pulse opacity-80"></div>
              </div>
              <span className="text-gray-700 font-mono text-sm font-bold tracking-wide uppercase">TABLE FOCUS: 100%</span>
            </div>

            <Users className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Supercharge Front-of-House.</h3>
            <p className="text-gray-600 leading-relaxed">
              No phone interruptions at the host stand. Fewer errors, faster table turns, and staff that can actually focus on the guests in front of them.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}