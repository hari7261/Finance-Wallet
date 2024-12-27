'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

export function CelebrationAnimation() {
  const [showAnimation, setShowAnimation] = useState(true)

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  useEffect(() => {
    if (showAnimation) {
      const duration = 3 * 1000 // Duration of the animation in milliseconds
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      // Create an interval for the confetti animation
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }

        const particleCount = Math.round(50 * (timeLeft / duration)) // Calculate particle count dynamically

        // Fire confetti from the left side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'], // Correct color codes
        })

        // Fire confetti from the right side
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'], // Correct color codes
        })
      }, 250) // Interval set to 250ms

      // Stop the animation after the duration
      setTimeout(() => {
        setShowAnimation(false)
      }, duration)

      // Cleanup the interval on component unmount or when animation ends
      return () => {
        clearInterval(interval)
      }
    }
  }, [showAnimation])

  // If the animation is complete, return null to unmount the component
  if (!showAnimation) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 pointer-events-none">
      <h1 className="text-4xl font-bold text-yellow-400 animate-bounce">Welcome</h1>
    </div>
  )
}
