import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Category } from '../server/api-types'
import { CreateCategoryData, CreateTransactionData } from '../validators/types'
import { APIService } from '../server/api'
import { formatDate } from '../utils/format_date'

interface FetchAPIProps {
  createCategory: (data: CreateCategoryData) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
  fetchCategories: () => Promise<void>
  categories: Category[]
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps)

type FetchAPIProviderProps = {
  children: ReactNode
}

export function FetchAPIPovider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    await APIService.createTransaction({...data, date: formatDate(data.date),
      amount: Number(data.amount.replace(/^[0-9]/g, ''))
    })
  }, [])

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    await APIService.createCategory(data)
  }, [])

  const fetchCategories = useCallback(async () => {
    const data = await APIService.getCategories()

    setCategories(data)
  }, [])                                       

  return (
    <FetchAPIContext.Provider
      value={{ categories, createCategory, fetchCategories, createTransaction }}
    >
      {children}
    </FetchAPIContext.Provider>
  )
}

export function useFetchAPI(): FetchAPIProps {
  return useContext(FetchAPIContext)
}
