import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Category, Transaction } from '../server/api-types'
import {
  CreateCategoryData,
  CreateTransactionData,
  TransactionsFiltersData,
} from '../validators/types'
import { APIService } from '../server/api'
import { formatDate } from '../utils/format_date'

interface FetchAPIProps {
  createCategory: (data: CreateCategoryData) => Promise<void>
  createTransactions: (data: CreateTransactionData) => Promise<void>
  fetchCategories: () => Promise<void>
  fetchTransactions: (filters: TransactionsFiltersData) => Promise<void>
  categories: Category[]
  transaction: Transaction[]
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps)

type FetchAPIProviderProps = {
  children: ReactNode
}

export function FetchAPIPovider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [transaction, setTransaction] = useState<Transaction[]>([])

  const createTransactions = useCallback(
    async (data: CreateTransactionData) => {
      
      // Remove todos os caracteres não numéricos do campo "amount" e converte para um número
      const amountTransform = parseInt(data.amount.replace(/[^0-9]/g, ''), 10)

      await APIService.createTransaction({
        ...data,
        date: formatDate(data.date),
        amount: amountTransform,
      })
    },
    [],
  )

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    await APIService.createCategory(data)
  }, [])

  const fetchCategories = useCallback(async () => {
    const data = await APIService.getCategories()

    setCategories(data)
  }, [])

  const fetchTransactions = useCallback(
    async (filters: TransactionsFiltersData) => {
      const transactions = await APIService.getTransactions({
        ...filters,
        beginDate: formatDate(filters.beginDate),
        endDate: formatDate(filters.endDate),
      })

      setTransaction(transactions)
    },
    [],
  )

  return (
    <FetchAPIContext.Provider
      value={{
        categories,
        transaction,
        createCategory,
        fetchCategories,
        createTransactions,
        fetchTransactions,
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  )
}

export function useFetchAPI(): FetchAPIProps {
  return useContext(FetchAPIContext)
}
