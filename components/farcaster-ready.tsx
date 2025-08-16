"use client"

import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export function FarcasterReady() {
  useEffect(() => {
    const callReady = async () => {
      try {
        // Wait a moment for React to render the content
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Call ready to dismiss the Farcaster splash screen
        await sdk.actions.ready()
      } catch (error) {
          console.error('❌ Failed to call ready:', error)
        try {
          await sdk.actions.ready()
        } catch (retryError) {
          console.error('❌ Retry also failed:', retryError)
        }
      }
    }

    callReady()
  }, [])

  // This component doesn't render anything - it just calls ready()
  return null
}