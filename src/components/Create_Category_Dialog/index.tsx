import { useCallback, useState } from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Title } from '../Title'
import { Input } from '../Input'
import { Container } from './style'

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  const onSubmit = useCallback(() => {
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
            <Input label="Nome" placeholder="Nome da Categoria..." />
            <Input label="Cor" type="color" />
          </div>

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
