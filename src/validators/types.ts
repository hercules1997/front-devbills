import { z } from 'zod';

import {
  createCategorySchema,
  createTransactionSchema,
  financialEvolutionFilterSchema,
  transactionsFilterSchema,
} from './schemas';

export type CreateCategoryData = z.infer<typeof createCategorySchema>;

export type CreateTransactionData = z.infer<typeof createTransactionSchema>;

export type TransactionsFilterData = z.infer<typeof transactionsFilterSchema>;

export type FinancialEvolutionFilterData = z.infer<
  typeof financialEvolutionFilterSchema
>;
