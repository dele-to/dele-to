"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Home, Plus } from "lucide-react"
import Link from "next/link"

const notFoundMessages = [
  {
    title: "Poof! It's gone.",
    description: "Just like your burnable links, this page has self-destructed.",
    buttonText: "Back to safety →",
    emoji: "💨"
  },
  {
    title: "This link has already burned.",
    description: "We'd show you the page, but it's already reduced to digital ashes.",
    buttonText: "Generate a new one",
    emoji: "🔥"
  },
  {
    title: "Erase complete.",
    description: "You found a 404 — which means the page has been wiped clean.",
    buttonText: "Undo? Just kidding.",
    emoji: "🗑️"
  },
  {
    title: "One-time view… used up.",
    description: "This page was meant to be seen once, and someone beat you to it.",
    buttonText: "Start over",
    emoji: "⏳"
  },
  {
    title: "File Shredded.",
    description: "We triple-checked. The bits are gone. The bytes are gone. Even the crumbs are gone.",
    buttonText: "Back to DELE.TO",
    emoji: "🪓"
  },
  {
    title: "This page expired… a long time ago.",
    description: "We'd retrieve it, but it's somewhere in the great /dev/null in the sky.",
    buttonText: "Find something still alive →",
    emoji: "⌛"
  },
  {
    title: "Your request has been securely shredded.",
    description: "Congratulations, you've stumbled upon a 404-grade secure deletion.",
    buttonText: "Try again",
    emoji: "🗜️"
  },
  {
    title: "Self-destruct sequence complete.",
    description: "You missed it. It was glorious. There were sparks. There was smoke.",
    buttonText: "Generate a new link",
    emoji: "💣"
  },
  {
    title: "Access revoked.",
    description: "Either the link burned, or it never existed. We'll never tell.",
    buttonText: "Return home",
    emoji: "🔒"
  },
  {
    title: "Erased beyond recovery.",
    description: "Not even forensic data recovery could help you here.",
    buttonText: "Clean start",
    emoji: "🧹"
  },
  {
    title: "Digital ashes remain.",
    description: "The data? Gone. The URL? Gone. Your curiosity? Still here.",
    buttonText: "Back to DELE.TO",
    emoji: "🌫️"
  },
  {
    title: "Mission scrubbed.",
    description: "Page was here. Now it's gone. Mission success.",
    buttonText: "Restart mission",
    emoji: "🛰️"
  },
  {
    title: "Link went up in smoke.",
    description: "It was here one moment… ...and gone faster than your internet provider's promises.",
    buttonText: "Home base",
    emoji: "💨"
  }
]

export default function NotFound() {
  const [currentMessage, setCurrentMessage] = useState(notFoundMessages[0])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Show a random message
    const randomIndex = Math.floor(Math.random() * notFoundMessages.length)
    setCurrentMessage(notFoundMessages[randomIndex])
  }, [])



  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-600">
                <Flame className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="text-6xl mb-4">{currentMessage.emoji}</div>
            <CardTitle className="text-2xl mb-2 text-red-900">
              404 - {currentMessage.title}
            </CardTitle>
            <CardDescription className="text-lg text-red-700">
              {currentMessage.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <Link href="/" className="w-full">
                <Button 
                  size="lg" 
                  className="w-full text-white hover:opacity-90 bg-red-600"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {currentMessage.buttonText}
                </Button>
              </Link>
              
              <Link href="/create" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Share
                </Button>
              </Link>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-red-50 border border-red-600">
              <p className="text-sm text-red-700">
                <strong>Lost?</strong> Don't worry, your secrets are still safe. 
                This page just followed DELE.TO's philosophy and self-destructed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}