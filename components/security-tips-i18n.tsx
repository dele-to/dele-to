"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export function SecurityTips() {
  const { t } = useTranslation();
  const [currentTipIndex, setCurrentTipIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const securityTips = [
    { key: 'usePassword' },
    { key: 'shortExpiration' },
    { key: 'limitViews' },
    { key: 'shareSecurely' },
    { key: 'verifyRecipient' },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * securityTips.length)
      setCurrentTipIndex(randomIndex)
      setIsVisible(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const getNewTip = () => {
    const randomIndex = Math.floor(Math.random() * securityTips.length)
    setCurrentTipIndex(randomIndex)
  }

  const dismissTip = () => {
    setIsVisible(false)
  }

  if (!isVisible || currentTipIndex === null) {
    return null
  }

  const currentTip = securityTips[currentTipIndex]

  return (
    <Alert className="mb-6 border-orange-600 bg-orange-50 dark:border-orange-400 dark:bg-orange-950/20">
      <div className="flex items-start gap-3">
        <Lightbulb className="h-5 w-5 mt-0.5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-200">
              💡 {t('security.title')}
            </h4>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={getNewTip}
                className="h-6 px-2 text-xs hover:opacity-80 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20"
              >
                {t('common.next')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={dismissTip}
                className="h-6 w-6 p-0 hover:opacity-80 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <AlertDescription className="text-sm mt-1 text-orange-800 dark:text-orange-300">
            {t(`security.tips.${currentTip.key}`)}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}
