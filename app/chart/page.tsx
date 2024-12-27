'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { getTransactions, Transaction } from '../utils/storage'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { format } from 'date-fns'

export default function ChartPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    setTransactions(getTransactions())
  }, [])

  const chartData = transactions.reduce((acc: any[], t) => {
    const date = format(new Date(t.date), 'MMM dd')
    const existingDate = acc.find(item => item.date === date)
    if (existingDate) {
      existingDate[t.type] += t.amount
      existingDate.total += t.type === 'income' ? t.amount : -t.amount
    } else {
      acc.push({
        date,
        income: t.type === 'income' ? t.amount : 0,
        expense: t.type === 'expense' ? t.amount : 0,
        total: t.type === 'income' ? t.amount : -t.amount
      })
    }
    return acc
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const balance = transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0)

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
        <motion.div
          className="text-center py-8 sm:py-12 md:py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Financial Activities Chart</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Visualize your income and expenses over time</p>
        </motion.div>
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-400 to-purple-600 text-white p-6">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="h-[300px] sm:h-[400px] md:h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" />
                      <XAxis dataKey="date" stroke="#e5e7eb" />
                      <YAxis stroke="#e5e7eb" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                        itemStyle={{ color: '#e5e7eb' }}
                        labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                      <Area type="monotone" dataKey="income" stroke="#4ade80" fillOpacity={1} fill="url(#colorIncome)" />
                      <Area type="monotone" dataKey="expense" stroke="#f87171" fillOpacity={1} fill="url(#colorExpense)" />
                      <Area type="monotone" dataKey="total" stroke="#60a5fa" fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    Current Balance: 
                    <span className={balance >= 0 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                      ${balance.toFixed(2)}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

