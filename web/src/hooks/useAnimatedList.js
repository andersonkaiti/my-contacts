import { useCallback, useState } from 'react'

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemIds, setPendingRemovalItemIds] = useState([])

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemIds((prevState) => [...prevState, id])
  }, [])

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    setPendingRemovalItemIds((prevState) =>
      prevState.filter((itemId) => itemId !== id),
    )
  }, [])

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) =>
        renderItem(item, {
          isLeaving: pendingRemovalItemIds.includes(item.id),
          handleRemoveItem,
          handleAnimationEnd,
        }),
      ),
    [items, pendingRemovalItemIds, handleRemoveItem, handleAnimationEnd],
  )

  return {
    items,
    setItems,
    renderList,
  }
}
