"use client"

import { sdk } from '@farcaster/miniapp-sdk'

export class FarcasterMiniApp {
    private static initialized = false

    static isInFarcaster(): boolean {
        if (typeof window === 'undefined') return false

        // Simplified detection - just check if we're in an iframe
        // The SDK will handle the rest
        return window.parent !== window
    }

    static async notifyReady() {
        try {
            if (typeof window === 'undefined') {
                return
            }

            await sdk.actions.ready()
            this.initialized = true
        } catch (error: unknown) {
            console.error('❌ Failed to call sdk.actions.ready():', error)
            if (error instanceof Error) {
                console.error('Error details:', {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                })
            }
            // Don't throw here as this shouldn't break the app
        }
    }

    static getContext() {
        try {
            return {
                isInFarcaster: this.isInFarcaster(),
                initialized: this.initialized,
                userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
                url: typeof window !== 'undefined' ? window.location.href : 'server',
                isIframe: typeof window !== 'undefined' ? window.parent !== window : false,
            }
        } catch (error: unknown) {
            console.error('Failed to get Farcaster context:', error)
            return null
        }
    }
}