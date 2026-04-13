'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

export default function FooterSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <footer className="relative w-full bg-secondary text-foreground px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Risk Reversal Box */}
        <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Glowing background effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-lg opacity-50 blur-lg animate-glow pointer-events-none"></div>

          {/* Card content */}
          <div className="relative bg-background border-2 border-accent rounded-lg p-12 mb-12">
            {/* Guarantee Badge */}
            <div className="inline-block bg-accent text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              THE GUARANTEE
            </div>

            {/* Guarantee Text */}
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              The &apos;Pays For Itself&apos; Guarantee
            </h3>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If Voxy Restro doesn&apos;t recover more lost revenue than it costs within the first 30 days, you don&apos;t pay us a dime. That&apos;s how confident we are that this will transform your business.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground">Answer every call on the first ring</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground">Take complete orders automatically</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground">Integrate seamlessly with Toast/OpenTable</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground">24/7 support in multiple languages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Button with Calendly Link */}
        <div className={`flex justify-center mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a 
            href="https://calendly.com/elystraai/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-accent text-primary px-12 py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
          >
            Book Your Integration Call
          </a>
        </div>

        {/* Contact & Copyright */}
        <div className={`text-center text-muted-foreground text-sm transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="mb-4 text-base">
            Questions? Contact us at <a href="mailto:eshaan@elystraai.com" className="font-medium text-foreground hover:text-accent transition-colors">eshaan@elystraai.com</a>
          </p>
          <p>&copy; {new Date().getFullYear()} Elystra AI. All rights reserved.</p>
          <p className="mt-2">Voxy Restro - Powered by Advanced AI</p>
        </div>
      </div>
    </footer>
  )
}