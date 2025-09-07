'use client'

import { useTheme } from 'next-themes'
import { Flame, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function LogoThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-3 rounded-full bg-orange-600">
        <Flame className="w-8 h-8 text-white" />
      </div>
    )
  }

  const handleThemeSwitch = () => {
    setIsAnimating(true)
    
    // Toggle between dark and light (system stays as system)
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }

    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 600)
  }

  const getLogoVariant = () => {
    if (theme === 'dark') {
      return {
        bgColor: 'bg-slate-800 hover:bg-slate-700 border-2 border-slate-600',
        icon: <Moon className="w-8 h-8 text-slate-200" />,
        label: 'Dark Theme'
      }
    } else {
      return {
        bgColor: 'bg-orange-600 hover:bg-orange-700',
        icon: <Flame className="w-8 h-8 text-white" />,
        label: 'Light Theme'
      }
    }
  }

  const logoVariant = getLogoVariant()

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleThemeSwitch}
        className={`
          p-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer
          transform hover:scale-110 active:scale-95
          ${logoVariant.bgColor}
          ${isAnimating ? 'animate-pulse scale-110 rotate-12' : ''}
          shadow-lg hover:shadow-xl
          relative overflow-hidden
        `}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme (Current: ${logoVariant.label})`}
        aria-label={`Theme switcher - ${logoVariant.label}`}
      >
        {/* Animated background effect */}
        <div className={`
          absolute inset-0 rounded-full opacity-0 transition-opacity duration-300
          ${isAnimating ? 'opacity-20 animate-ping' : ''}
          ${theme === 'dark' ? 'bg-slate-600' : 'bg-orange-400'}
        `} />
        
        {/* Icon with rotation animation */}
        <div className={`
          relative z-10 transition-transform duration-300 ease-in-out
          ${isAnimating ? 'rotate-180 scale-110' : ''}
        `}>
          {logoVariant.icon}
        </div>
      </button>
      
      {/* Theme indicator dots */}
      <div className="flex gap-1">
        <div className={`w-2 h-2 rounded-full transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`} />
        <div className={`w-2 h-2 rounded-full transition-all duration-200 ${theme === 'system' ? 'bg-gradient-to-r from-orange-500 to-slate-700 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`} />
      </div>
    </div>
  )
}
