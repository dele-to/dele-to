"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const accessTips = [
    {
        title: "Verify the Sender",
        description: "Confirm this link came from a trusted source through a separate communication channel before accessing."
    },
    {
        title: "Use a Secure Environment",
        description: "Access sensitive shares from a private device on a trusted network, not public computers or WiFi."
    },
    {
        title: "Clear After Use",
        description: "Clear your browser history and clipboard after accessing to remove traces of the decryption key."
    },
    {
        title: "Act Quickly",
        description: "Access the content promptly as it may have a short expiration time or limited view count."
    },
    {
        title: "Don't Share the Link",
        description: "This complete URL contains the decryption key. Never forward it to others or post it anywhere."
    },
    {
        title: "Save Securely",
        description: "If you need to save the content, use a secure password manager or encrypted storage, not plain text files."
    },
    {
        title: "Watch for Phishing",
        description: "Verify the domain matches the expected DELE.TO instance. Attackers may create fake lookalikes."
    },
    {
        title: "One-Time Access",
        description: "Many shares are set to 'burn after reading' - they'll be permanently destroyed after you view them."
    }
]

export function AccessTips() {
    const [currentTip, setCurrentTip] = useState<typeof accessTips[0] | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show a random tip after a short delay
        const timer = setTimeout(() => {
            // Use a deterministic approach to avoid hydration mismatch
            const randomIndex = Math.floor(Math.random() * accessTips.length)
            const randomTip = accessTips[randomIndex]
            setCurrentTip(randomTip)
            setIsVisible(true)
        }, 200) // Show after 0.2 seconds

        return () => clearTimeout(timer)
    }, [])

    const getNewTip = () => {
        const randomIndex = Math.floor(Math.random() * accessTips.length)
        const randomTip = accessTips[randomIndex]
        setCurrentTip(randomTip)
    }

    const dismissTip = () => {
        setIsVisible(false)
    }

    if (!isVisible || !currentTip) {
        return null
    }

    return (
        <Alert className="mb-6" style={{ borderColor: '#D2461E', backgroundColor: '#FDF2F2' }}>
            <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#D2461E' }} />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm" style={{ color: '#8B1A00' }}>💡 Access Tip: {currentTip.title}</h4>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={getNewTip}
                                className="h-6 px-2 text-xs hover:opacity-80"
                                style={{ color: '#D2461E' }}
                            >
                                New Tip
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={dismissTip}
                                className="h-6 w-6 p-0 hover:opacity-80"
                                style={{ color: '#D2461E' }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    <AlertDescription className="text-sm mt-1" style={{ color: '#B91C1C' }}>
                        {currentTip.description}
                    </AlertDescription>
                </div>
            </div>
        </Alert>
    )
}