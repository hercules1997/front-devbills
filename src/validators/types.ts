import { z } from 'zod'
import { createCategorySchema, createTransactionSchema, transactionsFiltersSchema } from './schemas'

export type CreateCategoryData = z.infer<typeof createCategorySchema>

export type CreateTransactionData = z.infer<typeof createTransactionSchema>

export type TransactionsFiltersData = z.infer<typeof transactionsFiltersSchema>
