import { useEffect, useRef, useState } from 'react'
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
  const [shouldRender, setShouldRender] = useState(visible)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
    }

    function handleAnimationEnd() {
      setShouldRender(false)
    }

    const overlayElement = overlayRef.current

    if (!visible && overlayElement) {
      overlayElement.addEventListener('animationend', handleAnimationEnd)
    }

    return () => {
      if (overlayElement) {
        overlayElement.removeEventListener('animationend', handleAnimationEnd)
      }
    }
  }, [visible])

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal>
      <Overlay isLeaving={!visible} ref={overlayRef}>
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
