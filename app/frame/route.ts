import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle frame interactions
    const { untrustedData } = body
    
    if (untrustedData?.buttonIndex === 1) {
      // Redirect to create page
      return NextResponse.json({
        type: 'frame',
        frameUrl: `${request.nextUrl.origin}/create`,
      })
    }

    // Default frame response
    return NextResponse.json({
      type: 'frame',
      frameUrl: `${request.nextUrl.origin}/`,
    })
  } catch (error) {
    console.error('Frame handler error:', error)
    return NextResponse.json(
      { error: 'Invalid frame request' },
      { status: 400 }
    )
  }
}

export async function GET() {
  // Return frame metadata for GET requests
  return NextResponse.json({
    name: 'DELE.TO',
    description: 'Secure credential sharing with client-side AES-256 encryption',
    image: '/SEO.png',
    button: {
      title: '🔒 Share Securely',
      action: 'link',
      target: '/create'
    }
  })
}