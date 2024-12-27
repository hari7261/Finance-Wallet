import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Personal Finance Tool',
  description: 'Track your income and expenses with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-950 to-blue-900 min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

