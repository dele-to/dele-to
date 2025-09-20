'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { useTheme } from 'next-themes'

function ThemeWatcher() {
  const { theme } = useTheme()
  React.useEffect(() => {
    if (theme === 'neon') {
      document.documentElement.classList.add('dark')
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return null
}

export function ThemeProvider({ children, ...props }: { children: React.ReactNode } & ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeWatcher />
      {children}
    </NextThemesProvider>
  )
}
