import { useCallback, useState } from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Title } from '../Title'
import { Input } from '../Input'
import { Container } from './style'
import { CreateCategoryData } from '../../validators/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategorySchema } from '../../validators/schemas'
import { useFetchAPI } from '../../hooks/useFetchAPI'

export const CreateCategoryDialog = () => {
  const { createCategory, fetchCategories } = useFetchAPI()
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryData>({
    defaultValues: {
      title: '',
      color: '',
    },
    resolver: zodResolver(createCategorySchema),
  })

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onSubmit = useCallback(
    async (data: CreateCategoryData) => {
      await createCategory(data)
      handleClose()
      await fetchCategories()
    },
    [handleClose, createCategory, fetchCategories],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova Categoria</Button>}
    >
      <Title
        title="Nova Categoria"
        subtitle="Crie sua nova categoria para suas transações"
      />

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da Categoria..."
              {...register('title')}
            />
            {errors.title?.message && <p>{errors.title?.message}</p>}
            <Input label="Cor" type="color" {...register('color')} />
            {errors.color?.message && <p>{errors.color?.message}</p>}
          </div>
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
