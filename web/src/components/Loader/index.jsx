import { ReactPortal } from '../ReactPortal'
import { Spinner } from '../Spinner'
import { Overlay } from './styles'

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return (
    <ReactPortal>
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  )
}
