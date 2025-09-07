"use client"

import { Lightbulb } from "lucide-react"

interface InlineTipProps {
  children: React.ReactNode
  className?: string
}

export function InlineTip({ children, className = "" }: InlineTipProps) {
  return (
    <div 
      className={`flex items-start gap-2 p-3 rounded-lg text-sm border border-red-600 bg-red-50 ${className}`}
    >
      <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-600" />
      <div className="text-red-700">{children}</div>
    </div>
  )
}