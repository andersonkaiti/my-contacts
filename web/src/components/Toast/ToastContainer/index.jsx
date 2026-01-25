import { useCallback, useEffect, useState } from 'react'
import { toastEventManager } from '../../../utils/toast'
import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'

export function ToastContainer() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text, duration } = event

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id),
    )
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
