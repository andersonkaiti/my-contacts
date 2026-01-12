import { createPortal } from 'react-dom'
import { Overlay } from './styles'

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.body,
  )
}
