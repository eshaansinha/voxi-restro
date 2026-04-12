'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, ChevronDown } from 'lucide-react'
import HeroSection from '@/components/sections/hero'
import BleedingNeckSection from '@/components/sections/bleeding-neck'
import UnfairAdvantageSection from '@/components/sections/unfair-advantage'
import TestimonialsSection from '@/components/sections/testimonials'
import ROIDashboardSection from '@/components/sections/roi-dashboard'
import POSIntegrationSection from '@/components/sections/pos-integration'
import InteractiveDemoSection from '@/components/sections/interactive-demo'
import FooterSection from '@/components/sections/footer'
import FloatingDemoButton from '@/components/floating-demo-button'

export default function Home() {
  const [showDemo, setShowDemo] = useState(false)
  const demoButtonRef = useRef<HTMLDivElement>(null)

  const handleDemoClick = () => {
    setShowDemo(true)
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Bleeding Neck Section */}
      <BleedingNeckSection />

      {/* Unfair Advantage Section */}
      <UnfairAdvantageSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* ROI Dashboard Section */}
      <ROIDashboardSection />

      {/* POS Integration Section */}
      <POSIntegrationSection />

      {/* Interactive Demo Section */}
      <InteractiveDemoSection demoButtonRef={demoButtonRef} />

      {/* Footer Section */}
      <FooterSection />

      {/* Floating Demo Button */}
      <div ref={demoButtonRef}>
        <FloatingDemoButton onClick={handleDemoClick} />
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" onClick={() => setShowDemo(false)}>
          <div 
            className="bg-background rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-foreground">Try Voxy Restro Live Demo</h3>
            <p className="text-muted-foreground mb-6">
              Press the microphone icon and speak naturally to order a pizza. Try to confuse our AI with complex requests, special requirements, or interesting accents.
            </p>
            <div className="bg-secondary rounded-lg p-6 text-center min-h-32 flex items-center justify-center">
              <p className="text-muted-foreground">Live demo audio interface would be integrated here</p>
            </div>
            <button
              onClick={() => setShowDemo(false)}
              className="mt-6 w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
