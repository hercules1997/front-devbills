import { z } from 'zod'
import { createCategorySchema, createTransactionSchema } from './schemas'

export type CreateCategoryData = z.infer<typeof createCategorySchema>

export type createTransactionData = z.infer<typeof createTransactionSchema>
