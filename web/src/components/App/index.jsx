import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../assets/styles/global'
import defaultTheme from '../../assets/styles/themes/default'
import { Router } from '../../router'
import { Header } from '../Header'
import { ToastContainer } from '../Toast/ToastContainer'
import { Container } from './styles'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <ToastContainer />

        <Container>
          <Header />

          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
