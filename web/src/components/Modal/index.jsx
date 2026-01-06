import { createPortal } from 'react-dom'
import { Button } from '../Button'
import { Container, Footer, Overlay } from './styles'

export function Modal({ danger = false }) {
  // o createPortal permite renderizar um elemento em um local diferente do DOM. Como primeiro argumento ele espera o elemento que vai ser renderizado e como segundo argumento ele espera o local onde vai ser renderizado
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
