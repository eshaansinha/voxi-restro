'use client'

import { useState, useRef } from 'react'
import HeroSection from '@/components/sections/hero'
import BleedingNeckSection from '@/components/sections/bleeding-neck'
import UnfairAdvantageSection from '@/components/sections/unfair-advantage'
import TestimonialsSection from '@/components/sections/testimonials'
import ROIDashboardSection from '@/components/sections/roi-dashboard'
import POSIntegrationSection from '@/components/sections/pos-integration'
import InteractiveDemoSection from '@/components/sections/interactive-demo'
import FooterSection from '@/components/sections/footer'
import FloatingDemoButton from '@/components/floating-demo-button'
import VoiceCallWidget from '@/components/VoiceCallWidget'

export default function Home() {
  const [showCall, setShowCall] = useState(false)
  const demoButtonRef = useRef<HTMLDivElement>(null)

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <BleedingNeckSection />
      <UnfairAdvantageSection />
      <TestimonialsSection />
      <ROIDashboardSection />
      <POSIntegrationSection />
      <InteractiveDemoSection demoButtonRef={demoButtonRef} />
      <FooterSection />

      {/* Floating Demo Button */}
      <div ref={demoButtonRef}>
        <FloatingDemoButton onClick={() => setShowCall(true)} />
      </div>

      {/* Voice Call Widget Modal */}
      {showCall && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <VoiceCallWidget
            agentId="111537bb-20d4-4aa2-ac36-7964c91ad715"
            agentName="Sofia"
            tokenUrl="/api/call/token"
            onClose={() => setShowCall(false)}
          />
        </div>
      )}
    </main>
  )
}