import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme }) => css`
    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${theme.colors.primary.main};
    font-size: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    transition: background .2s ease-in;

    &:hover {
      background: ${theme.colors.primary.light};
    }

    &:active {
      background: ${theme.colors.primary.dark};
    }

    &:disabled {
      background: #ccc;
      cursor: default;
    }
  `}
`
