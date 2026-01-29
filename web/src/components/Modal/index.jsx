import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'
import { Button } from '../Button'
import { ReactPortal } from '../ReactPortal'
import { Container, Footer, Overlay } from './styles'

export function Modal({
  danger = false,
  title,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible,
  isLoading,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal>
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container isLeaving={!visible} danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  )
}
