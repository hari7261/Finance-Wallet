'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingAnimation() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-blue-900 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-white text-4xl font-bold flex items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
      >
        <motion.span
          className="inline-block mr-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          💰
        </motion.span>
        <motion.span
          animate={{ y: [-10, 10] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          Loading Finance Tool...
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

