import { useCallback, useState } from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Title } from '../Title'
import { Input } from '../Input'
import { Container } from './style'

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false)
  const [nameCategory, setNameCategory] = useState('')
  const [color, setColor] = useState('')

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  
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
            <Button type="button" >
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  )
}
