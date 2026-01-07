import { createPortal } from 'react-dom'
import { Overlay } from './styles'

export function Loader() {
  return createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.body,
  )
}
