import { useEffect } from 'react'
import { useAnimatedList } from '../../../hooks/useAnimatedList'
import { toastEventManager } from '../../../utils/toast'

export function useToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    handleRemoveItem: handleRemoveMessage,
    pendingRemovalItemIds: pendingRemovalMessageIds,
    handleAnimationEnd,
  } = useAnimatedList()

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
  }, [setMessages])

  return {
    messages,
    handleRemoveMessage,
    pendingRemovalMessageIds,
    handleAnimationEnd,
  }
}
