import { useEffect } from 'react'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import { Container } from './styles'

const ONE_SECOND = 1000
const DEFAULT_TOAST_DURATION = 7 * ONE_SECOND

export function ToastMessage({
  message: { id, text, type, duration = DEFAULT_TOAST_DURATION },
  onRemoveMessage,
  isLeaving,
  animatedRef,
}) {
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
}
