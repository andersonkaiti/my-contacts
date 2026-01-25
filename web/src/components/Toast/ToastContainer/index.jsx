import { useEffect, useState } from 'react'
import { toastEventManager } from '../../../utils/toast'
import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'

export function ToastContainer() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = event

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random(),
          type,
          text,
        },
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          text={message.text}
          type={message.type}
        />
      ))}
    </Container>
  )
}
