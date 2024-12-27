'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "./ui/card"
import { getTransactions, Transaction } from '../utils/storage'

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = () => {
      setTransactions(getTransactions())
    }

    fetchTransactions()

    window.addEventListener('transactionAdded', fetchTransactions)

    return () => {
      window.removeEventListener('transactionAdded', fetchTransactions)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.slice(-5).reverse().map((transaction) => (
          <Card key={transaction.id} className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{transaction.description}</p>
                <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleString()}</p>
              </div>
              <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

