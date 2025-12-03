"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const securityTips = [
  {
    title: "Practice Data Compartmentalization",
    description: "Send usernames, passwords, and server locations in separate secure shares to limit exposure if one is compromised."
  },
  {
    title: "Stagger Your Deliveries",
    description: "Share login credentials in multiple parts - username first, then password, then server details with different expiration times."
  },
  {
    title: "Use Layered Distribution",
    description: "Send the secure link through one channel (email) and notify about it through another (SMS or Slack)."
  },
  {
    title: "Implement Time-Based Isolation",
    description: "Set shorter expiration for passwords (15 minutes) and longer for less sensitive information like usernames."
  },
  {
    title: "Verify Before You Share",
    description: "Confirm the recipient's identity through a separate communication channel before sending any secure links."
  },
  {
    title: "Enable Burn-After-Reading",
    description: "Set max views to 1 for highly sensitive data to ensure automatic destruction after the first access."
  },
  {
    title: "Add Password Barriers",
    description: "Enable password protection for critical credentials, creating an additional authentication layer."
  },
  {
    title: "Minimize Information Density",
    description: "Share only essential details. Break complex credentials into smaller, isolated components across multiple shares."
  },
  {
    title: "Use Contextual Titles",
    description: "Add descriptive titles like 'DB Username - Prod' or 'API Key - Staging' to help recipients identify content safely."
  },
  {
    title: "Coordinate Access Windows",
    description: "Inform recipients when you've shared something so they can access it promptly before expiration."
  },
  {
    title: "Avoid Network Exposure",
    description: "Create and access secure shares from trusted networks, never from public WiFi or shared computers."
  },
  {
    title: "Clean Digital Traces",
    description: "The complete share URL contains the decryption key. Clear it from browser history and clipboard after use."
  },
  {
    title: "Separate Authentication Factors",
    description: "For multi-factor setups, share passwords and 2FA backup codes in completely separate, time-staggered shares."
  },
  {
    title: "Use Progressive Disclosure",
    description: "Share general access info first, then specific credentials only after confirming the recipient received the first part."
  }
]

export function SecurityTips() {
  const [currentTip, setCurrentTip] = useState<typeof securityTips[0] | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show a random tip after a delay
    const timer = setTimeout(() => {
      // Use a deterministic approach to avoid hydration mismatch
      const randomIndex = Math.floor(Math.random() * securityTips.length)
      const randomTip = securityTips[randomIndex]
      setCurrentTip(randomTip)
      setIsVisible(true)
    }, 200) // Show after 0.2 seconds

    return () => clearTimeout(timer)
  }, [])

  const getNewTip = () => {
    const randomTip = securityTips[Math.floor(Math.random() * securityTips.length)]
    setCurrentTip(randomTip)
  }

  const dismissTip = () => {
    setIsVisible(false)
  }

  if (!isVisible || !currentTip) {
    return null
  }

  return (
    <Alert className="mb-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 py-3">
      <div className="flex items-start gap-2">
        <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-xs text-gray-800 dark:text-gray-200">Security Tip: {currentTip.title}</h4>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={getNewTip}
                className="h-5 px-1 text-xs hover:opacity-80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                New Tip
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={dismissTip}
                className="h-5 w-5 p-0 hover:opacity-80 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <AlertDescription className="text-xs mt-0.5 text-gray-700 dark:text-gray-300 leading-tight">
            {currentTip.description}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}