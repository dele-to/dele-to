"use client"

import { useEffect, useState } from 'react'
import { FarcasterMiniApp } from '@/lib/farcaster'

interface FarcasterProviderProps {
    children: React.ReactNode
}

export function FarcasterProvider({ children }: FarcasterProviderProps) {
    useEffect(() => {
        const initializeFarcaster = async () => {
            try {
                // Get context information
                const context = FarcasterMiniApp.getContext()

                // Always call sdk.actions.ready() immediately - this is critical!
                await FarcasterMiniApp.initialize()
            } catch (err) {
                console.error('❌ Failed to initialize Farcaster:', err)
                // Don't prevent app from loading even if Farcaster fails
            }
        }

        // Call immediately when component mounts
        initializeFarcaster()
    }, [])

    // Always render children immediately - don't wait for SDK
    return <>{children}</>
}