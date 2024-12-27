'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { addTransaction } from '../utils/storage'

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('income')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTransaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      description,
      date: new Date().toISOString(),
    }
    addTransaction(newTransaction)
    setAmount('')
    setType('income')
    setDescription('')

    // Trigger a re-render of the RecentTransactions component
    window.dispatchEvent(new Event('transactionAdded'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
          <CardTitle className="text-2xl">Add Transaction</CardTitle>
          <CardDescription className="text-blue-100">Enter your income or expense details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-lg font-semibold">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="rounded-full text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Type</Label>
              <RadioGroup value={type} onValueChange={(value) => setType(value as 'income' | 'expense')} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income" className="text-green-600 font-medium">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense" className="text-red-600 font-medium">Expense</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="rounded-full text-lg"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6">
            <Button type="submit" className="w-full rounded-full text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300">
              Add Transaction
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}

