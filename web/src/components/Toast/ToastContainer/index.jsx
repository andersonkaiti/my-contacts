import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'
import { useToastContainer } from './useToastContainer'

export function ToastContainer() {
  const { renderList } = useToastContainer()

  return (
    <Container>
      {renderList(
        (
          message,
          { handleRemoveItem, handleAnimationEnd, isLeaving, animatedRef },
        ) => (
          <ToastMessage
            key={message.id}
            message={message}
            onRemoveMessage={handleRemoveItem}
            isLeaving={isLeaving}
            onAnimationEnd={handleAnimationEnd}
            animatedRef={animatedRef}
          />
        ),
      )}
    </Container>
  )
}
