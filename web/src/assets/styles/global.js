import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Sora', sans-serif;
    }

    body {
      background-color: ${theme.colors.background};
      font-size: 16px;
      color: ${theme.colors.gray[900]};
    }

    button {
      cursor: pointer;
    }
  `}
`
