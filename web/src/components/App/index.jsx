import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../assets/styles/global'
import defaultTheme from '../../assets/styles/themes/default'
import { Routes } from '../../Routes'
import { Header } from '../Header'
import { ToastContainer } from '../Toast/ToastContainer'
import { Container } from './styles'

export function App() {
  useEffect(() => {
    console.log('useEffect executed')

    return () => {
      console.log('useEffect cleanup')
    }
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <ToastContainer />

        <Container>
          <Header />

          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
