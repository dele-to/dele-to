'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const themes = ['light', 'dark']

  const cycleTheme = () => {
    const currentTheme = theme === 'system' ? 'light' : theme
    const currentIndex = themes.indexOf(currentTheme ?? 'light')
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
