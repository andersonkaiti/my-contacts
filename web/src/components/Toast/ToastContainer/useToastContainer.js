import { useCallback, useEffect, useState } from 'react'
import { toastEventManager } from '../../../utils/toast'

export function useToastContainer() {
  const [messages, setMessages] = useState([])
  const [pendingRemovalMessageIds, setPendingRemovalMessageIds] = useState([])

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
    setPendingRemovalMessageIds((prevState) => [...prevState, id])
  }, [])

  const handleAnimationEnd = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id))
    setPendingRemovalMessageIds((prevState) =>
      prevState.filter((messageId) => messageId !== id),
    )
  }, [])

  return {
    messages,
    handleRemoveMessage,
    pendingRemovalMessageIds,
    handleAnimationEnd,
  }
}
