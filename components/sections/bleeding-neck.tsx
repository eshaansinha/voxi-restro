'use client'

import { useEffect, useState, useRef } from 'react'
import { PhoneMissed, Clock, Users, Zap, CheckCircle2, TrendingUp } from 'lucide-react'

export default function BleedingNeckSection() {
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
    <section ref={sectionRef} className="relative w-full bg-[#050505] text-foreground px-4 md:px-8 py-24 md:py-32 overflow-hidden border-b border-white/5">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
            Every missed call is <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">lost revenue.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Restaurants miss up to 30% of calls during the Friday rush. At $40 a ticket, you aren't just missing orders—you're actively funding your competition.
          </p>
        </div>

        {/* Modern Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT PANEL: The Old Way */}
          <div className={`relative group transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Lighter Elevated Charcoal Card */}
            <div className="h-full bg-[#1c1c1c] border border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col relative overflow-hidden transition-all duration-300 hover:border-red-500/50">
              {/* Subtle top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
              
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-bold mb-6">
                  <PhoneMissed className="w-4 h-4" />
                  The Old Way
                </div>
                <h3 className="text-3xl font-bold text-white">The Friday Chaos</h3>
              </div>

              {/* Metrics Stack */}
              <div className="flex flex-col gap-6 flex-grow">
                {/* Metric 1 */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-red-500/15 text-red-400 shrink-0 border border-red-500/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">5-10 Minute Wait Times</p>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">Staff places callers on hold to seat in-person guests. 30% of callers hang up and order elsewhere.</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-red-500/15 text-red-400 shrink-0 border border-red-500/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Distracted Front-of-House</p>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">Your hostess is chained to the phone instead of greeting the 6-top that just walked through the door.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Financial Impact */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-bold">Average Revenue Lost</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-red-500">-$1,200</span>
                  <span className="text-gray-400 font-medium">/ weekend</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: The Voxy Way */}
          <div className={`relative group transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            
            {/* Animated Glowing Shadow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-accent/50 via-accent/20 to-transparent rounded-[1.5rem] opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Elevated Warm Espresso Card */}
            <div className="relative h-full bg-[#261712] border border-accent/40 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transition-all duration-300">
              
              {/* Dynamic Waveform Graphic top right */}
              <div className="absolute top-8 right-8 flex items-end gap-1 h-8 opacity-60">
                {[...Array(6)].map((_, i) => {
                  const waveHeights = [60, 85, 45, 95, 55, 75];
                  return (
                    <div
                      key={i}
                      className="w-1 bg-accent rounded-full animate-pulse"
                      style={{
                        height: `${waveHeights[i]}%`,
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '1s'
                      }}
                    />
                  );
                })}
              </div>

              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold text-sm mb-6">
                  <Zap className="w-4 h-4" />
                  The Voxy Way
                </div>
                <h3 className="text-3xl font-bold text-white">Zero Leaked Revenue</h3>
              </div>

              {/* Metrics Stack */}
              <div className="flex flex-col gap-6 flex-grow">
                {/* Metric 1 */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-accent/15 text-accent shrink-0 border border-accent/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Sub-2 Second Pickup</p>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">Unlimited simultaneous lines. Every caller is greeted instantly, effectively dropping abandonment to 0%.</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-accent/15 text-accent shrink-0 border border-accent/30">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">100% Upsell Consistency</p>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">Unlike a stressed employee, the AI never forgets to offer garlic knots or an extra drink, bumping average tickets.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Financial Impact */}
              <div className="mt-12 pt-8 border-t border-accent/30 bg-gradient-to-t from-accent/10 to-transparent -mx-8 -mb-8 px-8 pb-8">
                <p className="text-accent text-sm mb-2 uppercase tracking-wider font-bold">Average Revenue Captured</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">+$1,200</span>
                  <span className="text-gray-300 font-medium">/ weekend</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}