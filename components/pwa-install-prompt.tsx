'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Share, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

// Extend Navigator interface to include standalone property for iOS PWA detection
declare global {
  interface Navigator {
    standalone?: boolean
  }
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check for standalone mode (iOS Safari)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      // Check for PWA mode (Android Chrome)
      const isPWA = window.navigator.standalone === true
      // Check if launched from home screen
      const isFromHomeScreen = document.referrer.includes('android-app://')
      
      return isStandalone || isPWA || isFromHomeScreen
    }

    // Check if device is mobile
    const checkIfMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    // Check if prompt was previously dismissed
    const wasPromptDismissed = () => {
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      const dismissedTime = dismissed ? parseInt(dismissed) : 0
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
      return daysSinceDismissed < 7 // Don't show again for 7 days
    }

    setIsInstalled(checkIfInstalled())
    setIsMobile(checkIfMobile())

    // Only show prompt if not installed, is mobile, and wasn't recently dismissed
    if (!checkIfInstalled() && checkIfMobile() && !wasPromptDismissed()) {
      // Listen for the beforeinstallprompt event
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault()
        setDeferredPrompt(e as BeforeInstallPromptEvent)
        // Show prompt after a short delay to avoid being intrusive
        setTimeout(() => setShowPrompt(true), 3000)
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      // For iOS Safari, show manual install instructions
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isInStandaloneMode = window.navigator.standalone
      
      if (isIOS && !isInStandaloneMode) {
        setTimeout(() => setShowPrompt(true), 3000)
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }
  }, [])

  const handleDismiss = () => {
    // Store dismissal timestamp in localStorage
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    setShowPrompt(false)
  }

  // Don't render if not mobile, already installed, or shouldn't show prompt
  if (!isMobile || isInstalled || !showPrompt) {
    return null
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/i.test(navigator.userAgent)

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <Smartphone className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Install DELE.TO App
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add to your home screen for faster access and a better experience
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close install prompt"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        </div>
        
        <div className="space-y-3">
          {isIOS && (
            <>
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                <span>Tap the <Share className="inline h-4 w-4 mx-1" /> <strong>Share</strong> button at the bottom of your screen</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                <span>Scroll down and select <strong>"Add to Home Screen"</strong> from the menu</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                <span>Tap <strong>"Add"</strong> in the top right corner to complete installation</span>
              </div>
            </>
          )}
          
          {isAndroid && (
            <>
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                <span>Tap the <strong>three dots menu (⋮)</strong> in the top right corner of your browser</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                <span>Look for and select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                <span>Confirm by tapping <strong>"Add"</strong> or <strong>"Install"</strong> in the popup</span>
              </div>
            </>
          )}
          
          {!isIOS && !isAndroid && (
            <div className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center text-xs font-semibold">!</span>
              <span>Look for <strong>"Add to Home Screen"</strong> or <strong>"Install"</strong> option in your browser's menu to install this app</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Once installed, you can access DELE.TO directly from your home screen
          </p>
        </div>
      </div>
    </div>
  )
}
