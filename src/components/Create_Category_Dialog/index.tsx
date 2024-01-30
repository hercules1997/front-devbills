import { useCallback, useState } from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Title } from '../Title'
import { Input } from '../Input'
import { Container } from './style'
import { api } from '../../server/api'

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false)
  const [nameCategory, setNameCategory] = useState('')
  const [color, setColor] = useState('')

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const create_Category = async () => {
    const data = {
      title: nameCategory,
      color: color,
    }

    await api.post('/categories', data)
  }
  const onSubmit = useCallback(() => {
    create_Category()

    handleClose()
  }, [handleClose])

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
        <form>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da Categoria..."
              onChange={(e) => setNameCategory(e.target.value)}
              value={nameCategory}
            />
            <Input
              label="Cor"
              type="color"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </div>
          <h1>{nameCategory}</h1>
          <h1>{color}</h1>
          <footer>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="button" onClick={onSubmit}>
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  )
}
