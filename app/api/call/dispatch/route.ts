import { NextResponse } from 'next/server'
import { AgentDispatchClient } from 'livekit-server-sdk'

export async function POST(request: Request) {
  try {
    const { roomName, agentId } = await request.json()
    if (!roomName || !agentId) return NextResponse.json({ error: 'roomName and agentId required' }, { status: 400 })

    const apiKey    = process.env.LIVEKIT_API_KEY!
    const apiSecret = process.env.LIVEKIT_API_SECRET!
    const wsUrl     = process.env.LIVEKIT_WS_URL!

    const httpUrl = wsUrl.replace('wss://', 'https://').replace('ws://', 'http://')
    const dispatchClient = new AgentDispatchClient(httpUrl, apiKey, apiSecret)

    // Fire and forget — don't await, return immediately to browser
    dispatchClient.createDispatch(roomName, 'hetzner-test-agent', { metadata: agentId })
      .catch(console.error)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}