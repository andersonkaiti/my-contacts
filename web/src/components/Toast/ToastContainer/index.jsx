import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'
import { useToastContainer } from './useToastContainer'

export function ToastContainer() {
  const {
    messages,
    handleRemoveMessage,
    pendingRemovalMessageIds,
    handleAnimationEnd,
  } = useToastContainer()

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={pendingRemovalMessageIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  )
}
