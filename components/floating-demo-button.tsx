'use client'

import { Mic } from 'lucide-react'
import { useState } from 'react'

interface FloatingDemoButtonProps {
  onClick: () => void
}

export default function FloatingDemoButton({ onClick }: FloatingDemoButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-2 bg-background text-foreground rounded-lg text-sm font-semibold whitespace-nowrap shadow-lg border border-accent transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Tap to order a pizza (Live Demo)
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-accent transform rotate-45 -translate-y-1/2"></div>
      </div>

      {/* Floating Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-20 h-20 rounded-full bg-accent text-primary flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-float"
        style={{
          boxShadow: isHovered
            ? '0 0 40px rgba(255, 107, 53, 0.7), 0 0 60px rgba(255, 107, 53, 0.4)'
            : '0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)'
        }}
      >
        {/* Pulsing background ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-accent animate-pulse-glow"
          style={{
            opacity: isHovered ? 0.4 : 0.2,
            transform: 'scale(1.3)'
          }}
        ></div>

        {/* Icon */}
        <Mic className="w-10 h-10 relative z-10" />
      </button>

      {/* Additional glow layer */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          width: '80px',
          height: '80px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: isHovered
            ? 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
          transition: 'all 0.3s duration-300'
        }}
      ></div>
    </div>
  )
}
