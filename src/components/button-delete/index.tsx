import { Trash } from '@phosphor-icons/react';
import { ComponentProps, forwardRef } from 'react';

import { Container } from './styles';

type ButtonIconProps = ComponentProps<'button'>;

export const ButtonDelete = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ({ ...props }, ref) {
    return (
      <Container {...props} ref={ref}>
        <Trash />
      </Container>
    )
  },
);
