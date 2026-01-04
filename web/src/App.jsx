import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './assets/styles/global'
import defaultTheme from './assets/styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <h1>MyContacts</h1>
    </ThemeProvider>
  )
}
