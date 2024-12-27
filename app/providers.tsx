'use client'

import { useState, useEffect } from 'react'
import { PasswordProtection } from './components/PasswordProtection'
import { LoadingAnimation } from './components/LoadingAnimation'
import Header from './components/Header'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <>
      {!isAuthenticated && <PasswordProtection onSuccess={handleAuthSuccess} />}
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  )
}

