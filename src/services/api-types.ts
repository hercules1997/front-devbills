export type CreateCategory = {
  title: string
  color: string
}

export type Category = {
  _id: string
  title: string
  color: string
}

export type CreateTransaction = {
  categoryId: string
  title: string
  amount: number
  type: 'expense' | 'income' // Valores limitados às duas opções
  date: string // Data como string, formato esperado para ser validado ou formatado
}

export type TransactionsFilter = {
  title?: string
  categoryId?: string
  beginDate: string // String, assumindo que você está passando uma data no formato adequado
  endDate: string
}

export type Transaction = {
  _id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  date: Date // Data como objeto JavaScript para manipulação interna
  category: Category
}

export type TransactionDelete = string // Simplificado para um string, apenas o ID

export type Balance = {
  _id: string | null // Permitindo null caso não haja balanço disponível
  incomes: number
  expenses: number
  balance: number
}

export type Expense = {
  _id: string
  title: string
  amount: number
  color: string
}

export type Dashboard = {
  balance: Balance
  expenses: Expense[]
}

export type DashboardFilters = {
  beginDate: string
  endDate: string
}

export type FinancialEvolutionFilters = {
  year: string
}

export type FinancialEvolution = {
  _id: [number, number] // Um par de números (ex.: ano, mês)
  incomes: number
  expenses: number
  balance: number
}
