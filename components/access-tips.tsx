"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export function AccessTips() {
    const { t } = useTranslation()
    const [currentTipKey, setCurrentTipKey] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    const tipKeys = [
        'verifySender',
        'secureEnvironment', 
        'clearAfterUse',
        'actQuickly',
        'dontShare',
        'saveSecurely',
        'watchPhishing',
        'oneTimeAccess'
    ]

    useEffect(() => {
        // Show a random tip after a short delay
        const timer = setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * tipKeys.length)
            const randomTipKey = tipKeys[randomIndex]
            setCurrentTipKey(randomTipKey)
            setIsVisible(true)
        }, 200) // Show after 0.2 seconds

        return () => clearTimeout(timer)
    }, [])

    const getNewTip = () => {
        const randomIndex = Math.floor(Math.random() * tipKeys.length)
        const randomTipKey = tipKeys[randomIndex]
        setCurrentTipKey(randomTipKey)
    }

    const dismissTip = () => {
        setIsVisible(false)
    }

    if (!isVisible || !currentTipKey) {
        return null
    }

    return (
        <Alert className="mb-6 border-red-600 bg-red-50">
            <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-red-900">💡 {t('view.accessTips.title')}: {t(`view.accessTips.${currentTipKey}.title`)}</h4>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={getNewTip}
                                className="h-6 px-2 text-xs hover:opacity-80 text-red-600"
                                aria-label="Get new access tip"
                            >
                                {t('view.accessTips.newTip')}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={dismissTip}
                                className="h-6 w-6 p-0 hover:opacity-80 text-red-600"
                                aria-label="Dismiss tip"
                                title="Dismiss tip"
                            >
                                <X className="h-3 w-3" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                    <AlertDescription className="text-sm mt-1 text-red-700">
                        {t(`view.accessTips.${currentTipKey}.description`)}
                    </AlertDescription>
                </div>
            </div>
        </Alert>
    )
}