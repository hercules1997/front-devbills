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
  type: 'income' | 'expense'
  date: string
}


export type TransactionsFilters = {
  title?: string
  categoryId?: string
  beginDate: string
  endDate: string
}

export type Transaction = {
  _id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  date: string
  category: Category
}
