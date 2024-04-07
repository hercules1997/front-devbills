import { useCallback, useEffect, useState } from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Title } from '../Title'
import { Input } from '../Input'
import {
  Container,
  ContentForm,
  ContentSelectColor,
  CurrencyInput,
  InputGroup,
  MessageError,
  RadioForm,
  RadioGroup,
} from './style'
import { InputMask } from '@react-input/mask'
import { useFetchAPI } from '../../hooks/useFetchAPI'
import { Category } from '../../server/api-types'
import { useForm } from 'react-hook-form'
import { createTransactionData } from '../../validators/types'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTransactionSchema } from '../../validators/schemas'

export const CreateTransactionDialog = () => {
  const { categories, fetchCategories } = useFetchAPI()
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  )
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<createTransactionData>({
    defaultValues: {
      categoryId: '',
      title: '',
      amount: '',
      date: dayjs('2024-01-01').format('DD/MM/YYYY'),
      type: 'income',
    },
    resolver: zodResolver(createTransactionSchema),
  })

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value
    const category = categories.find((cat) => cat._id === categoryId)
    setSelectedCategory(category || null)
  }

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleClose = useCallback(() => {
    reset()
    setOpen(false)
  }, [])
  const onSubmit = useCallback(() => {
    handleClose()
  }, [handleClose])

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
              <select
                title="select"
                {...register('categoryId')}
                onChange={(e) => handleCategoryChange(e)}
              >
                <option value="null">Selecione uma categoria...</option>
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

              {selectedCategory && (
                <ContentSelectColor color={selectedCategory.color}>
                  <p>Cor da categoria</p>
                  <div color={selectedCategory.color}>
                    {selectedCategory.color}
                  </div>
                </ContentSelectColor>
              )}
            </InputGroup>
            <Input
              variant="black"
              label="Nome"
              placeholder="Nome da Transação..."
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
              />
             { errors.categoryId &&(
              <MessageError>{errors.amount?.message}</MessageError>)}
            </InputGroup>
            <InputMask
              component={Input}
              mask="dd/mm/aaaa"
              replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
              label="Data"
              variant="black"
              placeholder="dd/mm/aaaa"
            />
            {errors.date && <MessageError>{errors.date?.message}</MessageError>}
            <RadioForm>
              <RadioGroup>
                <input type="radio" id="income" value="income" name="type" />
                <label htmlFor="income">Entrada</label>
              </RadioGroup>
              <RadioGroup>
                <input type="radio" id="expense" value="expense" name="type" />
                <label htmlFor="expense">Gasto</label>
              </RadioGroup>
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
