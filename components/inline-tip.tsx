"use client"

import { Lightbulb } from "lucide-react"

interface InlineTipProps {
  children: React.ReactNode
  className?: string
}

export function InlineTip({ children, className = "" }: InlineTipProps) {
  return (
    <div 
      className={`flex items-start gap-2 p-3 rounded-lg text-sm ${className}`}
      style={{ backgroundColor: '#FDF2F2', borderColor: '#D2461E', borderWidth: '1px' }}
    >
      <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D2461E' }} />
      <div style={{ color: '#B91C1C' }}>{children}</div>
    </div>
  )
}