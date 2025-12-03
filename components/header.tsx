"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="fixed top-4 right-4 z-50 flex items-center gap-2">
       
      <ThemeToggle />
    </header>
  )
}
