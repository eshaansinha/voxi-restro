'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Room,
  RoomEvent,
  createLocalAudioTrack,
  LocalAudioTrack,
  RemoteTrack,
  Track,
} from 'livekit-client'
import { Phone, PhoneOff, Mic, MicOff, Loader2, X } from 'lucide-react'

interface VoiceCallWidgetProps {
  agentId:    string
  agentName?: string
  tokenUrl:   string
  onClose:    () => void
}

type CallState = 'idle' | 'connecting' | 'connected' | 'disconnecting'

export default function VoiceCallWidget({ agentId, agentName = 'Agent', tokenUrl, onClose }: VoiceCallWidgetProps) {
  const [callState, setCallState] = useState<CallState>('idle')
  const [muted, setMuted]         = useState(false)
  const [duration, setDuration]   = useState(0)
  const [error, setError]         = useState<string | null>(null)

  const roomRef          = useRef<Room | null>(null)
  const audioTrackRef    = useRef<LocalAudioTrack | null>(null)
  const timerRef         = useRef<NodeJS.Timeout | null>(null)
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map())

  // Token cache — JWT only, no LiveKit connection, no worker spawn
  const cachedToken    = useRef<string | null>(null)
  const cachedWsUrl    = useRef<string | null>(null)
  const cachedRoomName = useRef<string | null>(null)
  const cachedTokenExp = useRef<number | null>(null)

  // ── Prefetch token on mount ──────────────────────────────────────────────
  // Pure HTTP call to Vercel — generates JWT only.
  // NO dispatch, NO LiveKit connection, NO worker spawn, ZERO cost.
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const prefetch = async () => {
      try {
        const res = await fetch(tokenUrl, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            agentId,
            participantName: `web-${Date.now()}`,
          }),
        })
        if (!res.ok) return
        const { token, wsUrl, roomName } = await res.json()
        cachedToken.current    = token
        cachedWsUrl.current    = wsUrl
        cachedRoomName.current = roomName
        cachedTokenExp.current = Date.now() + 55 * 60 * 1000
      } catch {
        // silently fail — startCall fallback handles it
      }
    }

    prefetch()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      doHangUp()
    }
  }, [])

  const fetchFreshToken = async (): Promise<{ token: string; wsUrl: string; roomName: string }> => {
    const res = await fetch(tokenUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ agentId, participantName: `web-${Date.now()}` }),
    })
    if (!res.ok) throw new Error('Failed to get token')
    return res.json()
  }

  const dispatchAgent = (roomName: string) => {
    // Fire and forget — called AFTER room.connect() so agent joins an active room
    fetch('/api/call/dispatch', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ roomName, agentId }),
    }).catch(console.error)
  }

  const startCall = async () => {
    setCallState('connecting')
    setDuration(0)
    setError(null)

    try {
      let token: string
      let wsUrl: string
      let roomName: string

      const tokenValid =
        cachedToken.current    !== null &&
        cachedWsUrl.current    !== null &&
        cachedRoomName.current !== null &&
        cachedTokenExp.current !== null &&
        Date.now() < cachedTokenExp.current

      if (tokenValid) {
        // PATH A — cached token valid, use it
        token    = cachedToken.current!
        wsUrl    = cachedWsUrl.current!
        roomName = cachedRoomName.current!
        cachedToken.current    = null
        cachedWsUrl.current    = null
        cachedRoomName.current = null
        cachedTokenExp.current = null
      } else {
        // PATH B — fetch fresh token
        const data = await fetchFreshToken()
        token    = data.token
        wsUrl    = data.wsUrl
        roomName = data.roomName
      }

      // Mic permission + room connect in parallel
      const [audioTrack] = await Promise.all([
        createLocalAudioTrack({ echoCancellation: true, noiseSuppression: true }),
        (async () => {
          const room = new Room({
            audioCaptureDefaults: { echoCancellation: true, noiseSuppression: true },
            disconnectOnPageLeave: false,
            connectOptions: { autoSubscribe: true },
          })
          roomRef.current = room

          room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
            if (track.kind === Track.Kind.Audio) {
              const audioEl = track.attach()
              audioEl.play().catch(console.error)
              audioElementsRef.current.set(track.sid, audioEl)
            }
          })

          room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
            const el = audioElementsRef.current.get(track.sid)
            if (el) { el.remove(); audioElementsRef.current.delete(track.sid) }
          })

          room.on(RoomEvent.Disconnected, () => {
            setCallState('idle')
            if (timerRef.current) clearInterval(timerRef.current)
          })

          await room.connect(wsUrl, token)

          // ── Dispatch agent AFTER connecting ──────────────────────────
          // Room is live, user is in it — now spawn the agent.
          // This is the only place dispatch happens. Never on prefetch.
          // ─────────────────────────────────────────────────────────────
          dispatchAgent(roomName)
        })(),
      ])

      audioTrackRef.current = audioTrack
      await roomRef.current!.localParticipant.publishTrack(audioTrack)

      setCallState('connected')
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)

    } catch (err: any) {
      console.error('Call failed:', err)
      setError(err.message || 'Failed to start call')
      setCallState('idle')
      if (audioTrackRef.current) {
        audioTrackRef.current.stop()
        audioTrackRef.current = null
      }
    }
  }

  const doHangUp = async () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (audioTrackRef.current) {
      audioTrackRef.current.stop()
      audioTrackRef.current = null
    }
    if (roomRef.current) {
      await roomRef.current.disconnect()
      roomRef.current = null
    }
    audioElementsRef.current.forEach(el => el.remove())
    audioElementsRef.current.clear()
  }

  const hangUp = async () => {
    setCallState('disconnecting')
    await doHangUp()
    setCallState('idle')
    setDuration(0)
    setMuted(false)
    onClose()
  }

  const toggleMute = () => {
    if (!audioTrackRef.current) return
    if (muted) audioTrackRef.current.unmute()
    else       audioTrackRef.current.mute()
    setMuted(m => !m)
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60), sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 relative">

      {callState === 'idle' && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-gray-500" />
        </button>
      )}

      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all
        ${callState === 'connected'
          ? 'bg-[#FF6B35] shadow-lg shadow-orange-200 animate-pulse'
          : 'bg-[#FF6B35]'
        }`}
      >
        {agentName[0]?.toUpperCase()}
      </div>

      <div className="text-center">
        <p className="font-semibold text-gray-900">{agentName}</p>
        <p className="text-sm text-gray-500">
          {callState === 'idle'          && 'Tap to start a live demo'}
          {callState === 'connecting'    && 'Connecting...'}
          {callState === 'connected'     && fmt(duration)}
          {callState === 'disconnecting' && 'Ending call...'}
        </p>
        {callState === 'connected' && (
          <p className="text-xs text-green-500 font-medium mt-0.5">● Live</p>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 text-center px-2">{error}</p>
      )}

      <div className="flex items-center gap-3">
        {callState === 'connected' && (
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
              ${muted
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {muted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        )}

        {callState === 'idle' ? (
          <button
            onClick={startCall}
            className="w-14 h-14 rounded-full bg-[#FF6B35] hover:bg-[#e55a25] text-white flex items-center justify-center shadow-md transition-all hover:scale-105"
            style={{ boxShadow: '0 4px 20px rgba(255, 107, 53, 0.4)' }}
          >
            <Phone size={22} />
          </button>
        ) : callState === 'connected' ? (
          <button
            onClick={hangUp}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-all hover:scale-105"
          >
            <PhoneOff size={22} />
          </button>
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <Loader2 size={22} className="animate-spin text-gray-400" />
          </div>
        )}
      </div>

      {callState === 'idle' && (
        <p className="text-xs text-gray-400 text-center">
          Free live demo — no signup required
        </p>
      )}

      {callState === 'connected' && (
        <p className="text-xs text-gray-400 text-center">
          Hang up to end the demo
        </p>
      )}
    </div>
  )
}