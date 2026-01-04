import logo from '../../assets/images/logo.svg'
import { Container, InputSearchContainer } from './styles'

// O src recebe a logo pois ela é um caminho estático gerado pelo Webpack
// /static/media/logo.f9814e679929dde1e0ab3c3c525ba371.svg

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
    </Container>
  )
}
