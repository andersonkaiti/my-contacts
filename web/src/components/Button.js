import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme, danger }) => css`
    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${danger ? theme.colors.danger.main : theme.colors.primary.main};
    font-size: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    transition: background .2s ease-in;

    &:hover {
      background: ${danger ? theme.colors.danger.light : theme.colors.primary.light};
    }

    &:active {
      background: ${danger ? theme.colors.danger.dark : theme.colors.primary.dark};
    }

    &:disabled {
      background: #ccc;
      cursor: default;
    }
  `}
`
