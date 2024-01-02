import { Container } from './styles'

type TitleProps = {
  title: string
  subtitle: string
}

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <Container>
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </Container>
  )
}
