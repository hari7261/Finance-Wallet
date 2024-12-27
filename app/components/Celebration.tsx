'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

export function Celebration() {
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
    }, 250)

    const messageTimeout = setTimeout(() => {
      setShowMessage(false)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(messageTimeout)
    }
  }, [])

  if (!showMessage) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 pointer-events-none">
      <h1 className="text-4xl font-bold text-primary animate-bounce">Welcome!</h1>
    </div>
  )
}

