'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonials = [
  {
    text: "I thought AI would annoy my customers. Instead, my average ticket size went up 18% because Voxy never forgets to upsell the garlic knots. It paid for itself by Tuesday.",
    name: 'Mark D.',
    role: 'Multi-Unit Pizza Owner',
    avatarUrl: 'owner_1.png',
    stat: '+18%',
    statLabel: 'avg ticket size',
  },
  {
    text: "This was the first Halloween I actually got to take my kids trick-or-treating. Voxy handled 140 calls that night. Zero missed orders, zero stress.",
    name: 'Sarah T.',
    role: 'Independent Italian Restaurant',
    avatarUrl: 'owner_2.png',
    stat: '140',
    statLabel: 'calls in one night',
  },
  {
    text: "Staffing the phones in a multilingual kitchen was a nightmare. Voxy switches between English, Hindi, and Hinglish flawlessly. Kitchen errors dropped to almost zero.",
    name: 'David R.',
    role: 'Bar & Grill Operator',
    avatarUrl: 'owner_3.png',
    stat: '~0',
    statLabel: 'kitchen errors',
  },
]

export default function TestimonialsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisibleCards(prev => [true, prev[1], prev[2]]), 0)
          setTimeout(() => setVisibleCards(prev => [prev[0], true, prev[2]]), 150)
          setTimeout(() => setVisibleCards(prev => [prev[0], prev[1], true]), 300)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] text-white px-4 md:px-8 py-24 md:py-36 overflow-hidden border-t border-white/5">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Real Results
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5">
            Don't take our word for it.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Restaurant owners who got their Friday nights back.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 ease-out ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Hover glow */}
              <div className="absolute -inset-px bg-gradient-to-b from-accent/30 to-transparent rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col bg-[#1e1e1e] rounded-[1.75rem] border border-white/25 group-hover:border-accent/40 transition-all duration-300 overflow-hidden">

                {/* Top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <div className="flex flex-col flex-1 p-8">

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white text-base leading-relaxed flex-1 mb-8">
                    "{t.text}"
                  </p>

                  {/* Stat pill */}
                  <div className="mb-8 inline-flex items-baseline gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-2 w-fit">
                    <span className="text-accent font-black text-2xl">{t.stat}</span>
                    <span className="text-accent/80 text-xs font-medium">{t.statLabel}</span>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-white/15 mb-6" />

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/25 flex-shrink-0">
                      <Image
                        src={t.avatarUrl}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{t.role}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom social proof bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8 border-t border-white/10">
          {[
            { value: '10,000+', label: 'calls handled' },
            { value: '$2.4M+', label: 'revenue recovered' },
            { value: '4.9/5', label: 'average rating' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-white">{item.value}</p>
              <p className="text-gray-400 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}