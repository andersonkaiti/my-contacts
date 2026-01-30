import { memo, useEffect } from 'react'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import { Container } from './styles'

const ONE_SECOND = 1000
const DEFAULT_TOAST_DURATION = 7 * ONE_SECOND

// Toda a vez que o componente pai sofre um re-render a partir de uma simples
// mudança no estado, isso gera re-render em todos os toasts filhos
// Para evitar isso, basta encapsular o componente com a função memo, que
// memoriza o componente e só o re-renderiza quando as props mudam
const ToastMessage = memo(
  ({
    message: { id, text, type, duration = DEFAULT_TOAST_DURATION },
    onRemoveMessage,
    isLeaving,
    animatedRef,
  }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        onRemoveMessage(id)
      }, duration)

      return () => {
        clearTimeout(timeoutId)
      }
    }, [id, onRemoveMessage, duration])

    function handleRemoveToast() {
      onRemoveMessage(id)
    }

    return (
      <Container
        type={type}
        onClick={handleRemoveToast}
        tabIndex={0}
        role="button"
        ref={animatedRef}
        isLeaving={isLeaving}
      >
        {type === 'danger' && <img src={xCircleIcon} alt="X" />}
        {type === 'success' && <img src={checkCircleIcon} alt="Check" />}
        <strong>{text}</strong>
      </Container>
    )
  },
)

export { ToastMessage }
