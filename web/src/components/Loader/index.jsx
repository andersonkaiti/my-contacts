import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'
import { ReactPortal } from '../ReactPortal'
import { Spinner } from '../Spinner'
import { Overlay } from './styles'

export function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal>
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  )
}
