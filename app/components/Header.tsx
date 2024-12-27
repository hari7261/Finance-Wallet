import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-b-full shadow-lg">
      <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold mb-2 sm:mb-0">FinanceTracker</Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-blue-200 transition-colors">Home</Link>
          <Link href="/chart" className="text-white hover:text-blue-200 transition-colors">Chart</Link>
        </div>
      </nav>
    </header>
  )
}

