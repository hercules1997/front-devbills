import { InputMask } from '@react-input/mask'
import { Input } from '../../components/Input'
import { Logo } from '../../components/Logo'
import { Title } from '../../components/Title'
import {
  Aside,
  Balance,
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
import { ButtonIcon } from '../../components/Button_Icon'
import { Card } from '../../components/Card'
import { Transaction } from '../../components/Transaction'
import { CreateCategoryDialog } from '../../components/Create_Category_Dialog'
import { CreateTransactionDialog } from '../../components/Create_Transaction_Dialog'
import { Categories_Pie_Chart, Category_Props } from '../../components/Categories_Pie_Chart'
import { Financial_Evolution_Bar_Chart } from '../../components/Financial_Evolution_Bar_Chart'
import { useForm } from 'react-hook-form'
import { TransactionsFiltersData } from '../../validators/types'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionsFiltersSchema } from '../../validators/schemas'
import { MessageError } from '../../components/Create_Transaction_Dialog/style'
import { useCallback, useEffect, useState } from 'react'
import { useFetchAPI } from '../../hooks/useFetchAPI'

export const Home = () => {
  const [selectCategory, setSelectCategory] = useState<Category_Props | null>(null)
  const { transaction, fetchTransactions } = useFetchAPI()

useEffect(() => {
  fetchTransactions(transactionsFiltersForm.getValues())

}, [fetchTransactions, ])



  const transactionsFiltersForm = useForm<TransactionsFiltersData>({
    defaultValues: {
      title: '',
      categoryId: '',
      beginDate: dayjs().startOf('month').format('DD/MM/YYYY'),
      endDate: dayjs().endOf('month').format('DD/MM/YYYY'),
    },
    resolver: zodResolver(transactionsFiltersSchema),
  })

  const handle_Select_Category = useCallback(
    ({ id, title, color }: Category_Props) => {
      setSelectCategory({ id, title, color })
      transactionsFiltersForm.setValue('categoryId', id)
    },
    [transactionsFiltersForm],
  )

    // const handle_Deselect_Category = useCallback(
    //   () => {
    //     setSelectCategory(null)
    //     transactionsFiltersForm.setValue('categoryId', '')
    //   },
    //   [transactionsFiltersForm],
    // )

    const onSubmitTransactions = useCallback(async (data: TransactionsFiltersData) => {
      await fetchTransactions(data)
    },[fetchTransactions])
  
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
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Entradas e saídas no período" />

            <InputGroup>
              <InputMask
                type="text"
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
                {...transactionsFiltersForm.register('beginDate')}
              />
              <MessageError>
                {transactionsFiltersForm.formState.errors.beginDate?.message}
              </MessageError>
              <InputMask
                type="text"
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
                {...transactionsFiltersForm.register('endDate')}
              />
              <MessageError>
                {transactionsFiltersForm.formState.errors.endDate?.message}
              </MessageError>
              <ButtonIcon
                onClick={transactionsFiltersForm.handleSubmit(
                  onSubmitTransactions,
                )}
              />
            </InputGroup>
          </Filters>

          <Balance>
            <Card title="Saldo" amount={300000} />
            <Card title="Entradas" amount={10000} variant="incomes" />
            <Card title="Saídas" amount={90000} variant="expenses" />
          </Balance>

          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categorias no período"
              />
            </header>
            <ChartContent>
              <Categories_Pie_Chart onClick={handle_Select_Category} />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldo, Entradas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <Financial_Evolution_Bar_Chart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title
              title="Transações"
              subtitle="Entradas e Saídas"
              {...transactionsFiltersForm.register('title')}
            />

            <SearchTransaction>
              <Input variant="black" placeholder="Buscar transação..." />
              <ButtonIcon
                onClick={transactionsFiltersForm.handleSubmit(
                  onSubmitTransactions,
                )}
              />
            </SearchTransaction>
          </header>

          <TransactionGroup>
            {transaction?.length &&
              transaction.map((item, index) => (
                <>
                  <Transaction
                    key={item._id}
                    id={index + 1}
                    title={item.title}
                    amount={
                      item.type === 'expense' ? item.amount * -1 : item.amount
                    }
                    date={dayjs(item.date).add(3, 'hours').format('DD/MM/YYYY')}
                    category={{
                      title: item.category.title,
                      color: item.category.color,
                    }}
                    variant={item.type}
                  />
                
                </>
              ))}
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  )
}
