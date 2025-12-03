"use client"

import { Lightbulb } from "lucide-react"

interface InlineTipProps {
  children: React.ReactNode
  className?: string
}

export function InlineTip({ children, className = "" }: InlineTipProps) {
  return (
    <div 
      className={`flex items-start gap-2 p-3 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 ${className}`}
    >
      <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  )
}