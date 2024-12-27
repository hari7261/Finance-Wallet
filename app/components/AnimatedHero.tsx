'use client'

import { motion } from 'framer-motion'

export function AnimatedHero() {
  return (
    <motion.div
      className="text-center py-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        Personal Finance Tracker
      </motion.h1>
      <motion.p
        className="text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Track your expenses and income with style!
      </motion.p>
    </motion.div>
  )
}

