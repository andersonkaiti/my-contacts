import { createPortal } from 'react-dom'
import { Button } from '../Button'
import { Container, Footer, Overlay } from './styles'

export function Modal({ danger = false }) {
  return createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Título do modal</h1>
        <p>Corpo do modal</p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>

          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.body,
  )
}
