'use client'

import { useEffect, useState, useRef } from 'react'
import { TrendingUp } from 'lucide-react'

export default function ROIDashboardSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animateBars, setAnimateBars] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setTimeout(() => setAnimateBars(true), 100)
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
    <section ref={sectionRef} className="relative w-full bg-secondary text-foreground px-4 md:px-8 py-20 md:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Headline */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          See the Dream Outcome
        </h2>
        <p className={`text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          This is what your dashboard looks like after 30 days with Voxy Restro.
        </p>

        {/* Dashboard Card with Glassmorphism */}
        <div className={`relative transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Glowing background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-2xl opacity-20 blur-xl"></div>

          {/* Card */}
          <div className="relative bg-background/80 backdrop-blur-md border border-accent/30 rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Dashboard Header */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-accent/20">
              <div className="p-2 bg-accent/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Elystra AI Owner Dashboard</h3>
                <p className="text-xs text-muted-foreground">30-Day Performance Report</p>
              </div>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Revenue Recaptured - Featured */}
              <div className="md:col-span-2">
                <div className="bg-accent/5 border border-accent/30 rounded-xl p-8">
                  <p className="text-sm font-bold text-accent uppercase tracking-wide mb-3">
                    30-Day Phone Revenue Recaptured
                  </p>
                  <p className={`text-4xl md:text-5xl font-black text-accent transition-all duration-1000 ${
                    animateBars ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}>
                    $12,450.00
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    Recovered revenue from calls that would have been missed
                  </p>
                </div>
              </div>

              {/* Other Metrics */}
              <div className="bg-background border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold mb-2">
                  Calls Handled
                </p>
                <p className={`text-3xl font-bold text-foreground transition-all duration-1000 ${
                  animateBars ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  1,242
                </p>
                <p className="text-xs text-muted-foreground mt-2">Answered automatically</p>
              </div>

              <div className="bg-background border border-border rounded-xl p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold mb-2">
                  Upsell Success Rate
                </p>
                <p className={`text-3xl font-bold text-accent transition-all duration-1000 delay-100 ${
                  animateBars ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  68%
                </p>
                <p className="text-xs text-muted-foreground mt-2">Additional items recommended</p>
              </div>

              <div className="bg-background border border-border rounded-xl p-6 md:col-span-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold mb-2">
                  Labor Hours Saved
                </p>
                <p className={`text-3xl font-bold text-foreground transition-all duration-1000 delay-200 ${
                  animateBars ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  140 hrs
                </p>
                <p className="text-xs text-muted-foreground mt-2">Staff freed from phone duty</p>
              </div>
            </div>

            {/* Animated Bar Chart - Revenue by Day */}
            <div className="border-t border-accent/20 pt-8">
              <h4 className="font-bold text-foreground mb-6">Revenue by Day</h4>
              <div className="flex items-end justify-between h-48 gap-3">
                {[
                  { day: 'Mon', value: 1200, label: '$1.2k' },
                  { day: 'Tue', value: 1100, label: '$1.1k' },
                  { day: 'Wed', value: 1400, label: '$1.4k' },
                  { day: 'Thu', value: 1300, label: '$1.3k' },
                  { day: 'Fri', value: 1900, label: '$1.9k' },
                  { day: 'Sat', value: 4200, label: '$4.2k' },
                  { day: 'Sun', value: 3800, label: '$3.8k' },
                ].map((item, idx) => {
                  const maxValue = 4200
                  const heightPercent = (item.value / maxValue) * 100
                  const isFriday = idx === 5
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full h-48 flex items-end justify-center">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${
                            isFriday 
                              ? 'bg-gradient-to-t from-accent via-accent to-accent/80 animate-glow' 
                              : 'bg-gradient-to-t from-accent/40 to-accent/20'
                          }`}
                          style={{
                            height: animateBars ? `${heightPercent}%` : '0%',
                            transitionDelay: `${idx * 100}ms`,
                          }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {item.label}
                        </div>
                      </div>
                      <p className={`text-xs font-bold ${isFriday ? 'text-accent' : 'text-muted-foreground'} text-center`}>
                        {item.day}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
