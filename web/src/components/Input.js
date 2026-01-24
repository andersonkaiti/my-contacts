import styled, { css } from 'styled-components'

export const Input = styled.input`
  ${({ theme, error }) => css`
    width: 100%;
    border: none;
    background: #fff;
    border: 2px solid #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color .2s ease-in;
    appearance: none;

    &:focus {
      border-color: ${theme.colors.primary.main};
    }

    ${
      error &&
      css`
        color: ${theme.colors.danger.main};
        border-color: ${theme.colors.danger.main} !important;
      `
    }

    &:disabled {
      background-color: ${theme.colors.gray[100]};
      border-color: ${theme.colors.gray[200]};
    }
  `}
`
