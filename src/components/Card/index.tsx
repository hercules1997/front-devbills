import {
  ArrowCircleDownRight,
  ArrowCircleUpRight,
  CurrencyCircleDollar,
} from '@phosphor-icons/react'
import { Container } from './style'
import { FormatCurrency } from '../../utils/format_currency'

type CardProps = {
  variant?: 'balance' | 'incomes' | 'expenses'
  title: string
  amount: number
}

const iconsMap = {
  balance: <CurrencyCircleDollar />,
  incomes: <ArrowCircleUpRight />,
  expenses: <ArrowCircleDownRight />,
}

export const Card = ({ variant = 'balance', title, amount }: CardProps) => {
  return (
    <Container $variant={variant}>
      {iconsMap[variant]}
      <span>{title}</span>
      <strong>{FormatCurrency(amount)}</strong>
    </Container>
  )
}
