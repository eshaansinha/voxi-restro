'use client'

import { useEffect, useState, useRef } from 'react'
import { ShieldCheck } from 'lucide-react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handlePlay = () => {
    if (!videoRef.current) return
    videoRef.current.muted = false
    videoRef.current.play()
    setIsPlaying(true)
  }

  const handleStop = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIsPlaying(false)
    setIsMuted(false)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(v => !v)
  }

  return (
    <section className="relative w-full min-h-screen bg-primary text-primary-foreground flex items-center justify-center px-4 md:px-8 py-16">
      
      {/* Custom Subtle Float Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-subtle-float {
          animation: subtle-float 2s ease-in-out infinite;
        }
      `}} />

      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">

        <div className={`flex justify-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block bg-accent text-primary px-4 py-2 rounded-full text-sm font-semibold">
            ATTENTION RESTAURANT OWNERS:
          </span>
        </div>

        <h1 className={`text-5xl md:text-7xl font-bold text-center leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Stop Losing $3,000+ A Month To Missed Friday Night Phone Calls.
        </h1>

        <p className={`text-lg md:text-xl text-center text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Voxy Restro is an AI agent that answers every call on the first ring, takes orders, integrates with Toast/OpenTable, and never asks for a smoke break.
        </p>

        {/* Current Season Offer Banner - Balanced Size */}
        <div className={`flex justify-center mb-14 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} animate-subtle-float`}>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-black/40 backdrop-blur-sm border border-accent/40 shadow-[0_0_25px_rgba(255,107,53,0.15)] rounded-3xl sm:rounded-full px-6 py-4 md:px-8 md:py-4 max-w-[95%] sm:max-w-none text-center sm:text-left">
            <div className="bg-accent/20 p-2 rounded-full flex-shrink-0 mb-1 sm:mb-0">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm md:text-base font-medium text-gray-200 leading-snug">
              <span className="block sm:inline font-bold text-accent uppercase tracking-wide sm:mr-3 text-base md:text-lg mb-1 sm:mb-0">Current Season Offer:</span> 
              $300 custom setup. If it doesn't pay for itself in 30 days, <span className="block sm:inline font-bold text-white mt-1 sm:mt-0">you get a full refund.</span>
            </p>
          </div>
        </div>

        {/* Video Player */}
        <div className={`w-full transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div
            className="relative w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(255, 107, 53, 0.35), 0 0 140px rgba(255, 107, 53, 0.15)' }}
          >
            <video
              ref={videoRef}
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
            </video>

            {/* Center button — play when stopped, stop when playing */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={isPlaying ? handleStop : handlePlay}
            >
              {/* Overlay — only when not playing */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              )}

              {/* Button — always centered, only visible on hover when playing */}
              <div className={`relative z-10 w-24 h-24 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 group-hover:scale-110
                ${isPlaying
                  ? 'bg-black/40 border-white/20 opacity-0 group-hover:opacity-100'
                  : 'bg-[#FF6B35]/20 border-[#FF6B35]/50 group-hover:bg-[#FF6B35]/30'
                }`}
                style={!isPlaying ? { boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)' } : {}}
              >
                {isPlaying ? (
                  /* Stop icon */
                  <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z"/>
                  </svg>
                ) : (
                  /* Play icon */
                  <svg className="w-9 h-9 text-[#FF6B35] ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </div>
            </div>

            {/* Mute toggle — only when playing */}
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold hover:bg-black/80 transition-colors"
              >
                {isMuted ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 19L19 20.27 20.27 19 5.27 4 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                    Unmute
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    Mute
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}