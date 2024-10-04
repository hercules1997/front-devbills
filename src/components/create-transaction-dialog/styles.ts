import { InputNumberFormat } from '@react-input/number-format';
import { styled } from 'styled-components';

import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  > label {
    color: ${theme.colors.dark};
    font-size: 0.625rem;
  }

  select {
    height: 2.25rem;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    background-color: ${theme.colors.white};
    color: ${theme.colors.dark};
    border: 0.4px solid #5656;

    transform: all 100ms;

    &:focus {
      border-color: ${theme.colors.neutral};
    }
  }
`

export const CurrencyInput = styled(InputNumberFormat)`
  height: 2.25rem;
  background-color: ${theme.colors.white};
  border: 0;
  border-radius: 0.25rem;
  padding: 0 0.75rem;
  color: ${theme.colors.dark};
  font-size: 1rem;
  width: 100%;
  border: 0.4px solid #5656;
  transform: all 100ms;

  &:focus {
    border-color: ${theme.colors.neutral};
  }

  &::placeholder {
    color: ${theme.colors.neutral};
  }
`

export const RadioForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 1rem;
    height: 1rem;
    accent-color: ${theme.colors.black};
  }

  label {
    color: ${theme.colors.black};
    font-size: 0.875rem;
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 0.125rem;
  font-size: 0.625rem;
  line-height: 80%;
  color: ${theme.colors.error};
`;
