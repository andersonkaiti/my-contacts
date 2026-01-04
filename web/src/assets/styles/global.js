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
      background-color: ${theme.backgroundColor};
      font-size: 16px;
    }

    button {
      cursor: pointer;
    }
  `}
`
