import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../assets/styles/global'
import defaultTheme from '../../assets/styles/themes/default'
import Header from '../Header'
import { Container } from './styles'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Container>
        <Header />
      </Container>
    </ThemeProvider>
  )
}
