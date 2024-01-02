import { ReactNode } from 'react'
import { Content, Overlay, Portal, Root, Trigger } from './styles'

type DialogProps = {
  children: ReactNode
  trigger: JSX.Element
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Dialog = ({
  children,
  trigger,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Overlay />
        <Content>{children}</Content>
      </Portal>
    </Root>
  )
}
