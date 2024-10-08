import { formatCurrency } from '../../utils/format-currency'
import { ButtonDelete } from '../button-delete'
import { Container, Info, Content } from './styles'

type TransactionProps = {
  id: number
  title: string
  date: string
  amount: number
  category: {
    title: string
    color: string
  }
  variant?: 'income' | 'expense'
  onDelete: (id: string) => Promise<void> // Adicione esta linha
}

export function Transaction({
  id,
  title,
  date,
  amount,
  category,
  variant = 'income',
  onDelete, // Adicione esta linha
}: TransactionProps) {
  const handleDelete = async () => {
    try {
      await onDelete(id.toString()) // Chame a função de deletar
      // Aqui você pode exibir uma mensagem de sucesso ou atualizar o estado conforme necessário
    } catch (error) {
      console.error('Erro ao deletar a transação:', error)
    }
  }

  return (
    <Container>
      <Info>
        <ButtonDelete onClick={handleDelete}>
        </ButtonDelete>
        <span>#{id.toString().padStart(4, '0')}</span>
        <div>
          <strong>{title}</strong>
          <span>{date}</span>
        </div>
      </Info>

      <Content $variant={variant} $tagColor={category.color}>
        <strong>{formatCurrency(amount)}</strong>
        <span>{category.title.toUpperCase()}</span>
      </Content>
    </Container>
  )
}
