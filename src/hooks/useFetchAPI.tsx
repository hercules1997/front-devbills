import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import { APIService } from '../services/api'
import {
  Category,
  Dashboard,
  FinancialEvolution,
  Transaction,
} from '../services/api-types'
import { formatDate } from '../utils/format-date'
import {
  CreateCategoryData,
  CreateTransactionData,
  FinancialEvolutionFilterData,
  TransactionsFilterData,
} from '../validators/types'

interface FetchAPIProps {
  dashboard: Dashboard
  financialEvolution: FinancialEvolution[]
  createCategory: (data: CreateCategoryData) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
  deleteTransaction: (id: string) => Promise<void> // ID como string
  fetchCategories: () => Promise<void>
  fetchTransactions: (filters: TransactionsFilterData) => Promise<void>
  fetchDashboard: (
    filters: Pick<TransactionsFilterData, 'beginDate' | 'endDate'>,
  ) => Promise<void>
  fetchFinancialEvolution: (
    filters: FinancialEvolutionFilterData,
  ) => Promise<void>
  categories: Category[]
  transactions: Transaction[]
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps)

type FetchAPIProviderProps = {
  children: ReactNode
}

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [dashboard, setDashboard] = useState<Dashboard>({} as Dashboard)
  const [financialEvolution, setFinancialEvolution] = useState<
    FinancialEvolution[]
  >([])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    try {
      await APIService.createTransaction({
        ...data,
        date: formatDate(data.date),
        amount: Number(data.amount.replace(/[^0-9]/g, '')),
      })
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
  }, [])

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      await APIService.deleteTransaction(id)
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }, [])

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    try {
      await APIService.createCategory(data)
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const data = await APIService.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
    }
  }, [])

 const fetchTransactions = useCallback(
   async (filters: TransactionsFilterData) => {
     try {
       const transactions = await APIService.getTransactions({
         ...filters,
         beginDate: formatDate(filters.beginDate),
         endDate: formatDate(filters.endDate),
       })
       setTransactions(transactions) // Isso deve atualizar o estado das transações
     } catch (error) {
       console.error('Erro ao buscar transações:', error)
     }
   },
   [],
 )

  const fetchDashboard = useCallback(
    async ({
      beginDate,
      endDate,
    }: Pick<TransactionsFilterData, 'beginDate' | 'endDate'>) => {
      try {
        const dashboard = await APIService.getDashboard({
          beginDate: formatDate(beginDate),
          endDate: formatDate(endDate),
        })
        setDashboard(dashboard)
      } catch (error) {
        console.error('Erro ao buscar dashboard:', error)
      }
    },
    [],
  )

  const fetchFinancialEvolution = useCallback(
    async ({ year }: FinancialEvolutionFilterData) => {
      try {
        const financialEvolution = await APIService.getFinancialEvolution({
          year: year.padStart(4, '0'),
        })
        setFinancialEvolution(financialEvolution)
      } catch (error) {
        console.error('Erro ao buscar evolução financeira:', error)
      }
    },
    [],
  )

  return (
    <FetchAPIContext.Provider
      value={{
        categories,
        transactions,
        createCategory,
        fetchCategories,
        fetchTransactions,
        createTransaction,
        fetchDashboard,
        deleteTransaction,
        dashboard,
        fetchFinancialEvolution,
        financialEvolution,
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  )
}

export function useFetchAPI(): FetchAPIProps {
  return useContext(FetchAPIContext)
}
