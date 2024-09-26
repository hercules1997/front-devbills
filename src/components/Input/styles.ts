import { styled } from 'styled-components';

import { theme } from '../../styles/theme';

type ContainerProps = {
  $variant: 'black' | 'white';
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  width: 100%;

  label {
    color: ${theme.colors.black};
    font-size: 0.625rem;
  }

  input {
    height: 2.25rem;
    background-color: ${(props) => theme.colors[props.$variant]};
    border: 0;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    color: ${theme.colors.black};
    font-size: 1rem;
    width: 100%;
    border: 0.4px solid #5656;
    transition: all 100ms;

    &:focus {
      border-color: ${theme.colors.primary};
    }

    &::placeholder {
      color: ${theme.colors.dark};
    }
  }

  span {
    margin-top: 0.125rem;
    font-size: 0.625rem;
    line-height: 90%;
    color: ${theme.colors.error};
  }
`;
