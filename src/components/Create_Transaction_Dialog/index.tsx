import { useCallback, useEffect, useState } from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Title } from '../Title'
import { Input } from '../Input'
import {
  Container,
  ContentForm,
  // ContentSelectColor,
  CurrencyInput,
  InputGroup,
  MessageError,
  RadioForm,
  RadioGroup,
} from './style'
import { InputMask } from '@react-input/mask'
import { useFetchAPI } from '../../hooks/useFetchAPI'

import { useForm } from 'react-hook-form'
import { CreateTransactionData } from '../../validators/types'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTransactionSchema } from '../../validators/schemas'
// import { Category } from '../../server/api-types'

export const CreateTransactionDialog = () => {
  const { categories, fetchCategories, createTransactions } = useFetchAPI()
  const [open, setOpen] = useState(false)

  //  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
  //    null,
  //  )
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTransactionData>({
    defaultValues: {
      categoryId: 'null',
      title: '',
      amount: '',
      date: dayjs('2024-01-01').format('DD/MM/YYYY'),
      type: 'income',
    },
    resolver: zodResolver(createTransactionSchema),
  })

  //    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //      const categoryId = e.target.value

  //      console.log(categoryId)
  //      const category = categories.find((cat) => cat._id === categoryId)
  //      setSelectedCategory(category || null)
  //    }

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleClose = useCallback(() => {
    reset()
    setOpen(false)
  }, [reset])

  const onSubmit = useCallback(
    async (data: CreateTransactionData) => {
      console.log('Data before submitting:', data)
      await createTransactions(data)
      handleClose()
    },
    [handleClose, createTransactions],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova Transação</Button>}
    >
      <Container>
        <Title
          title="Nova Transação"
          subtitle="Crie uma nova transação para seu controle financeiro"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ContentForm>
            <InputGroup>
              <label>Categoria</label>
              <select title="select" {...register('categoryId')}>
                <option value="null" disabled>
                  Selecione uma categoria...
                </option>
                {categories?.length &&
                  categories.map((itemCategory) => (
                    <option key={itemCategory._id} value={itemCategory._id}>
                      {itemCategory.title}
                    </option>
                  ))}
              </select>
              {errors.categoryId && (
                <MessageError>{errors.categoryId?.message}</MessageError>
              )}
            </InputGroup>
            <Input
              variant="black"
              label="Nome"
              placeholder="Nome da Transação..."
              {...register('title')}
            />
            {errors.title && (
              <MessageError>{errors.title?.message}</MessageError>
            )}
            <InputGroup>
              <label>Valor</label>
              <CurrencyInput
                format="currency"
                currency="BRL"
                placeholder="R$ 0,00"
                {...register('amount')}
              />
              {errors.amount && (
                <MessageError>{errors.amount?.message}</MessageError>
              )}
            </InputGroup>
            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              label="Data"
              variant="black"
              placeholder="dd/mm/aaaa"
              {...register('date')}
            />
            {errors.date && <MessageError>{errors.date.message}</MessageError>}
            <RadioForm>
              <RadioGroup>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  {...register('type')}
                />
                <label htmlFor="income">Entrada</label>
              </RadioGroup>
              <RadioGroup>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  {...register('type')}
                />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
              {errors.type && (
                <MessageError>{errors.type?.message}</MessageError>
              )}
            </RadioForm>
          </ContentForm>
          <footer>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  )
}
