'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface PasswordProtectionProps {
  onSuccess: () => void;
}

export function PasswordProtection({ onSuccess }: PasswordProtectionProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '9835690931') {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-blue-900 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
    >
      <Card className="w-full max-w-md bg-white bg-opacity-90">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">Enter Password</CardTitle>
          <CardDescription>Please enter the password to access your personal finance tool.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`border-2 ${error ? 'border-red-500' : 'border-blue-300'} rounded-full`}
            />
            {error && <p className="text-red-500 text-sm mt-2">Incorrect password. Please try again.</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full rounded-full bg-blue-600 hover:bg-blue-700">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}

