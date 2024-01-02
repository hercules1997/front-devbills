import { ComponentProps, forwardRef } from 'react'
import { Container } from './style'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'default' | 'outline'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
  { children, variant = 'default', ...props },
  ref,
) {
  return (
    <Container ref={ref} {...props} $variant={variant}>
      {children}
    </Container>
  )
})
