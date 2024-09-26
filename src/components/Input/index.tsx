import { ComponentProps, forwardRef } from 'react'

import { Container } from './styles'

type InputProps = ComponentProps<'input'> & {
  label?: string
  variant?: 'white' | 'white'
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { label, variant = 'white', error, ...props },
  ref,
) {
  return (
    <Container $variant={variant}>
      {label && <label>{label}</label>}
      <input ref={ref} {...props} />
      {error && <span>{error}</span>}
    </Container>
  )
})
