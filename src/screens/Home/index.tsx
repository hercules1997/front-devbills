import { zodResolver } from '@hookform/resolvers/zod'
import { X } from '@phosphor-icons/react'
import { InputMask } from '@react-input/mask'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ButtonIcon } from '../../components/button-icon'
import { Card } from '../../components/card'
import {
  CategoriesPieChart,
  CategoryProps,
} from '../../components/categories-pie-chart'
import { CreateCategoryDialog } from '../../components/create-category-dialog'
import { CreateTransactionDialog } from '../../components/create-transaction-dialog'
import { FinancialEvolutionBarChart } from '../../components/financial-evolution-bar-chart'
import { Input } from '../../components/input'
import { Logo } from '../../components/logo'
import { Title } from '../../components/title'
import { Transaction } from '../../components/transaction'
import { useFetchAPI } from '../../hooks/useFetchAPI'
import { transactionsFilterSchema } from '../../validators/schemas'
import {
  FinancialEvolutionFilterData,
  TransactionsFilterData,
} from '../../validators/types'
import {
  Aside,
  Balance,
  CategoryBadge,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  Header,
  InputGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionGroup,
} from './styles'

export function Home() {
  const transactionsFilterForm = useForm<TransactionsFilterData>({
    defaultValues: {
      title: '',
      categoryId: '',
      beginDate: dayjs().startOf('year').format('DD/MM/YYYY'),
      endDate: dayjs().endOf('day').format('DD/MM/YYYY'),
    },
    resolver: zodResolver(transactionsFilterSchema),
  })

  const financialEvolutionFilterForm = useForm<FinancialEvolutionFilterData>({
    defaultValues: {
      year: dayjs().get('year').toString(),
    },
  })

  // Estados de carregamento
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false)
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
  const [isLoadingFinancialEvolution, setIsLoadingFinancialEvolution] =
    useState(false)

  // Estado de erro
  const [error, setError] = useState<string | null>(null)

  const {
    transactions,
    dashboard,
    financialEvolution,
    fetchFinancialEvolution,
    fetchTransactions,
    fetchDashboard,
    deleteTransaction
  } = useFetchAPI()

  // Formatação de datas para ISO
  const formatToISO = (dateString: string) => {
    return dayjs(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }

  useEffect(() => {
    const { beginDate, endDate } = transactionsFilterForm.getValues()

    fetchDashboard({ beginDate, endDate })
    fetchTransactions(transactionsFilterForm.getValues())
    fetchFinancialEvolution(financialEvolutionFilterForm.getValues())
  }, [
    fetchTransactions,
    transactionsFilterForm,
    fetchDashboard,
    fetchFinancialEvolution,
    financialEvolutionFilterForm,
  ])

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null)

  const handleSelectCategory = useCallback(
    async ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color })
      transactionsFilterForm.setValue('categoryId', id)

      await fetchTransactions(transactionsFilterForm.getValues())
    },
    [transactionsFilterForm, fetchTransactions],
  )

  const handleDeselectCategory = useCallback(async () => {
    setSelectedCategory(null)
    transactionsFilterForm.setValue('categoryId', '')

    await fetchTransactions(transactionsFilterForm.getValues())
  }, [transactionsFilterForm, fetchTransactions])

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      // Sua lógica para deletar a transação aqui
      console.log(`Deletando transação com ID: ${transactionId}`)
      // Exemplo de requisição para deletar
      await deleteTransaction(`${transactionId}`)
      // Atualize a lista de transações após a exclusão
      await fetchTransactions(transactionsFilterForm.getValues())
    } catch (error) {
      console.error('Erro ao deletar a transação:', error)
    }
  }

  const onSubmitTransactions = useCallback(
    async (data: TransactionsFilterData) => {
      setIsLoadingTransactions(true)
      setError(null)
      try {
        await fetchTransactions(data)
      } catch (err) {
        setError('Erro ao carregar transações.')
      } finally {
        setIsLoadingTransactions(false)
      }
    },
    [fetchTransactions],
  )

  const onSubmitDashboard = useCallback(
    async (data: TransactionsFilterData) => {
      setIsLoadingDashboard(true)
      setError(null)
      try {
        const { beginDate, endDate } = data

        await fetchDashboard({
          beginDate: formatToISO(beginDate),
          endDate: formatToISO(endDate),
        })
        await fetchTransactions({
          ...data,
          beginDate: formatToISO(beginDate),
          endDate: formatToISO(endDate),
        })
      } catch (err) {
        setError('Erro ao carregar o dashboard.')
      } finally {
        setIsLoadingDashboard(false)
      }
    },
    [fetchDashboard, fetchTransactions],
  )

  const onSubmitFinancialEvolution = useCallback(
    async (data: FinancialEvolutionFilterData) => {
      setIsLoadingFinancialEvolution(true)
      setError(null)
      try {
        await fetchFinancialEvolution(data)
      } catch (err) {
        setError('Erro ao carregar a evolução financeira.')
      } finally {
        setIsLoadingFinancialEvolution(false)
      }
    },
    [fetchFinancialEvolution],
  )

  return (
    <>
      <Header>
        <Logo />
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>

      <Main>
        {error && <p>{error}</p>}

        {isLoadingDashboard ? (
          <p>Carregando Dashboard...</p>
        ) : (
          <Balance>
            <Card
              title="Ganhos"
              amount={dashboard?.balance?.incomes || 0}
              variant="incomes"
            />
            <Card
              title="Gastos"
              amount={dashboard?.balance?.expenses * -1 || 0}
              variant="expenses"
            />
            <Card
              title="Saldo disponiivel"
              amount={dashboard?.balance?.balance || 0}
            />
          </Balance>
        )}

        <Filters>
          <Title title="Saldo" subtitle="Entradas e Saídas no período" />
          <InputGroup>
            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              variant="white"
              label="Início"
              placeholder="dd/mm/aaaa"
              error={transactionsFilterForm.formState.errors.beginDate?.message}
              {...transactionsFilterForm.register('beginDate')}
            />
            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              variant="white"
              label="Fim"
              placeholder="dd/mm/aaaa"
              error={transactionsFilterForm.formState.errors.endDate?.message}
              {...transactionsFilterForm.register('endDate')}
            />
            <ButtonIcon
              onClick={transactionsFilterForm.handleSubmit(onSubmitDashboard)}
            />
          </InputGroup>
        </Filters>

        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no período" />
            <SearchTransaction>
              <Input
                variant="white"
                placeholder="Procurar transação..."
                {...transactionsFilterForm.register('title')}
              />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(
                  onSubmitTransactions,
                )}
              />
            </SearchTransaction>
          </header>
          {isLoadingTransactions ? (
            <p>Carregando transações...</p>
          ) : (
            <TransactionGroup>
              {transactions?.length ? (
                transactions.map((item, index) => (
                  <Transaction
                    key={item._id}
                    id={index + 1}
                    amount={
                      item.type === 'expense' ? item.amount * -1 : item.amount
                    }
                    date={dayjs(item.date).add(3, 'hours').format('DD/MM/YYYY')}
                    category={{
                      title: item.category.title,
                      color: item.category.color,
                    }}
                    title={item.title}
                    variant={item.type}
                    onDelete={() => handleDeleteTransaction(item._id)} // Passando a função onDelete
                  />
                ))
              ) : (
                <p>Nenhuma transação encontrada</p>
              )}
            </TransactionGroup>
          )}
        </Aside>

        <Section>
          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categoria no período"
              />
              {selectedCategory && (
                <CategoryBadge
                  $color={selectedCategory.color}
                  onClick={handleDeselectCategory}
                >
                  <X />
                  {selectedCategory.title.toUpperCase()}
                </CategoryBadge>
              )}
            </header>
            <ChartContent>
              <CategoriesPieChart
                expenses={dashboard.expenses}
                onClick={handleSelectCategory}
              />
            </ChartContent>
          </ChartContainer>

          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldo, Entradas e Gastos no Ano"
              />

              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="white"
                  label="Ano"
                  placeholder="aaaa"
                  {...financialEvolutionFilterForm.register('year')}
                />
                <ButtonIcon
                  onClick={financialEvolutionFilterForm.handleSubmit(
                    onSubmitFinancialEvolution,
                  )}
                />
              </ChartAction>
            </header>

            {isLoadingFinancialEvolution ? (
              <p>Carregando evolução financeira...</p>
            ) : (
              <ChartContent>
                <FinancialEvolutionBarChart
                  financialEvolution={financialEvolution}
                />
              </ChartContent>
            )}
          </ChartContainer>
        </Section>
      </Main>
    </>
  )
}
