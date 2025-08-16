"use client"

import { useEffect } from "react"

const funnyMessages = [
    "🕵️ Well, well, well... what do we have here? A curious developer!",
    "🤖 Beep boop! You found the secret developer zone. Here's a cookie: 🍪",
    "🔍 Looking for bugs? The only bug here is your curiosity! 🐛",
    "👨‍💻 Ah, a fellow code detective! Nothing to see here, move along... or don't, I'm not your boss.",
    "🎭 Welcome to the theater of the console! Today's performance: 'Much Ado About Nothing'",
    "🚀 Houston, we have a... developer in the console! All systems normal.",
    "🧙‍♂️ You've discovered the ancient art of F12! Your wizard level: Apprentice",
    "🎪 Step right up to the greatest show on Earth: The Console Circus! 🎪",
    "🕴️ Agent Smith here. You took the red pill, didn't you?",
    "🦄 Congratulations! You've found the mythical console unicorn! Make a wish! ✨",
    "🍕 Pizza delivery! Oh wait, wrong window. This is just the console.",
    "🎮 Achievement unlocked: Console Explorer! +10 Developer XP",
    "🔮 The console crystal ball shows... absolutely nothing interesting.",
    "🎯 Bulls-eye! You hit the developer target. Your prize: this message.",
    "🎨 Welcome to the console art gallery! Today's exhibit: 'Emptiness in JavaScript'",
    "🏴‍☠️ Ahoy matey! You've found the developer's treasure chest. The treasure is... knowledge!",
    "🎪 Ladies and gentlemen, presenting the amazing console magician! *pulls rabbit from hat* 🐰",
    "🌮 Taco 'bout finding the console! Get it? Taco... talk... I'll see myself out.",
    "🎸 *plays air guitar* Welcome to the console rock concert! The band is... silent.",
    "🦸‍♂️ With great console power comes great responsibility. Use it wisely, young padawan."
]

export function ConsoleMessage() {
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return

        // Add a small delay to make it feel more natural
        const timer = setTimeout(() => {
            const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]

            console.log(`%c${randomMessage}`, 'color: #3b82f6; font-size: 14px; font-weight: bold; padding: 8px;')
            console.log('%cDELE.TO - Built with ❤️ by Ardd', 'color: #6b7280; font-size: 12px;')

            // Add some ASCII art for extra fun
            console.log(`
   ____                           ____  _                     
  / ___|  ___  ___ _   _ _ __ ___ / ___|| |__   __ _ _ __ ___ 
  \\___ \\ / _ \\/ __| | | | '__/ _ \\\\___ \\| '_ \\ / _\` | '__/ _ \\
   ___) |  __/ (__| |_| | | |  __/ ___) | | | | (_| | | |  __/
  |____/ \\___|\\___|\\__,_|_|  \\___|____/|_| |_|\\__,_|_|  \\___|
      `)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return null // This component doesn't render anything
}