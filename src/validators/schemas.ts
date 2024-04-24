import { z } from 'zod'
import { allRegex } from '../utils/regex'

export const transactionsFiltersSchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().optional(),
  beginDate: z.string().regex(allRegex.date, {
    message: 'Data invalida!',
  }),
  endDate: z.string().regex(allRegex.date, {
    message: 'Data invalida!',
  }),
})

export const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Deve conter pelo menos 1 caractere.' })
    .max(255),
  color: z
    .string()
    .regex(allRegex.color, { message: 'Deve seguir o padrão #RRGGBB' }),
})

export const createTransactionSchema = z.object({
  categoryId: z
    .string()
    .regex(allRegex.categoryId, { message: 'Escolha uma categoria' }),
  title: z.string().min(1, { message: ' Deve conter pelo menos 1 caractere.' }).max(255),
  amount: z
    .string()
    .min(1, { message: ' Deve conter pelo menos 1 caractere.' }).max(255),
  date: z
    .string()
    .regex(allRegex.date, {
      message: 'Data invalida!',
    }),
    type: z.enum(['income', 'expense'], {
      errorMap: () => ({ message: 'Selecione um tipo válido.'})
    })
})
