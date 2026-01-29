import { createRef, useCallback, useRef, useState } from 'react'

/**
   No código-fonte do React, a função createRef funciona assim:

   export function createRef(): RefObject {
    const refObject = {
      current: null,
    }

    return refObject
   }
 */

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemIds, setPendingRemovalItemIds] = useState([])

  const animatedRefs = useRef(new Map())

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemIds((prevState) => [...prevState, id])
  }, [])

  const handleAnimationEnd = useCallback((id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id))
    setPendingRemovalItemIds((prevState) =>
      prevState.filter((itemId) => itemId !== id),
    )
  }, [])

  const getAnimatedRef = useCallback((id) => {
    let animatedRef = animatedRefs.current.get(id)

    if (!animatedRef) {
      animatedRef = createRef()

      animatedRefs.current.set(id, animatedRef)
    }

    return animatedRef
  }, [])

  const renderList = useCallback(
    (renderItem) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemIds.includes(item.id)

        const animatedRef = getAnimatedRef(item.id)

        return renderItem(item, {
          isLeaving,
          handleRemoveItem,
          handleAnimationEnd,
          animatedRef,
        })
      }),
    [
      items,
      pendingRemovalItemIds,
      handleRemoveItem,
      handleAnimationEnd,
      getAnimatedRef,
    ],
  )

  return {
    items,
    setItems,
    renderList,
  }
}
