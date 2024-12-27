export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
}

export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return []
  const storedTransactions = localStorage.getItem('transactions')
  return storedTransactions ? JSON.parse(storedTransactions) : []
}

export function addTransaction(transaction: Transaction): void {
  const transactions = getTransactions()
  transactions.push(transaction)
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

export function clearTransactions(): void {
  localStorage.removeItem('transactions')
}

