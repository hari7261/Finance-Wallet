import HeroSection from './components/HeroSection'
import TransactionForm from './components/TransactionForm'
import RecentTransactions from './components/RecentTransactions'
import { CelebrationAnimation } from './components/CelebrationAnimation'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CelebrationAnimation />
      <HeroSection />
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto">
          <TransactionForm />
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}

