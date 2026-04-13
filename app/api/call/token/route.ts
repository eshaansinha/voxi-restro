import { NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

export async function POST(request: Request) {
  try {
    const { agentId, participantName } = await request.json()
    if (!agentId) return NextResponse.json({ error: 'agentId is required' }, { status: 400 })

    const apiKey    = process.env.LIVEKIT_API_KEY!
    const apiSecret = process.env.LIVEKIT_API_SECRET!
    const wsUrl     = process.env.LIVEKIT_WS_URL!

    const roomName = `web-call-${agentId}-${Date.now()}`
    const identity = participantName || `web-user-${Date.now()}`

    const token = new AccessToken(apiKey, apiSecret, { identity, ttl: '1h' })
    token.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true })
    const jwt = await token.toJwt()

    return NextResponse.json({ token: jwt, roomName, identity, wsUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}