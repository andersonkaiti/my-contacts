import { useEffect, useState } from 'react'
import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'

export function ToastContainer() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function handleAddToast() {
      const { type, text } = event.detail

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random(),
          type,
          text,
        },
      ])
    }

    document.addEventListener('addtoast', handleAddToast)

    // A função de cleanup é necessário para evitar execução de vários event
    // listeners ao renderizar o componente novamente
    return () => {
      document.removeEventListener('addtoast', handleAddToast)
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
