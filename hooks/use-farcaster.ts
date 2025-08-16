"use client"

import { useEffect, useState } from 'react'
import { FarcasterMiniApp } from '@/lib/farcaster'

export function useFarcaster() {
  const [isInFarcaster, setIsInFarcaster] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkFarcaster = () => {
      const inFarcaster = FarcasterMiniApp.isInFarcaster()
      setIsInFarcaster(inFarcaster)
      
      if (inFarcaster) {
        // Initialize and notify ready
        FarcasterMiniApp.notifyReady().then(() => {
          setIsReady(true)
        })
      } else {
        setIsReady(true)
      }
    }

    checkFarcaster()
  }, [])

  return {
    isInFarcaster,
    isReady,
    notifyReady: FarcasterMiniApp.notifyReady,
  }
}