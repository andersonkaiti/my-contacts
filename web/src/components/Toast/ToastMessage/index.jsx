import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import { Container } from './styles'

export function ToastMessage({ text, type = 'default' }) {
  return (
    <Container>
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  )
}
