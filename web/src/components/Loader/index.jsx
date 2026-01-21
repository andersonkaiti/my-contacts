import { createPortal } from 'react-dom'
import { Spinner } from '../Spinner'
import { Overlay } from './styles'

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.body,
  )
}
