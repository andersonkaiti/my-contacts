import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import { Container } from './styles'

export function ToastMessage({ message: { id, text, type }, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(id)
  }

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      // A posição do elemento ao navegar com tab é 0 (primeira posição)
      tabIndex={0}
      // Define o elemento como um botão
      role="button"
    >
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  )
}
