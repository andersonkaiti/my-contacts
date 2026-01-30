import { createRef, useCallback, useEffect, useRef, useState } from 'react'

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue)
  const [pendingRemovalItemIds, setPendingRemovalItemIds] = useState([])

  const animatedRefs = useRef(new Map())
  const animationEndListeners = useRef(new Map())

  const handleAnimationEnd = useCallback((id) => {
    const removeListener = animationEndListeners.current.get(id)
    removeListener()

    animationEndListeners.current.delete(id)
    animatedRefs.current.delete(id)

    setItems((prevState) => prevState.filter((item) => item.id !== id))
    setPendingRemovalItemIds((prevState) =>
      prevState.filter((itemId) => itemId !== id),
    )
  }, [])

  useEffect(() => {
    pendingRemovalItemIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId)
      const alreadyHasListener = animationEndListeners.current.get(itemId)
      const animatedElement = animatedRef?.current

      if (animatedElement && !alreadyHasListener) {
        function onAnimationEnd() {
          handleAnimationEnd(itemId)
        }

        function removeListener() {
          animatedElement.removeEventListener('animationend', onAnimationEnd)
        }

        animationEndListeners.current.set(itemId, removeListener)

        animatedElement.addEventListener('animationend', onAnimationEnd)
      }
    })
  }, [pendingRemovalItemIds, handleAnimationEnd])

  useEffect(() => {
    const removeListeners = animationEndListeners.current

    return () => {
      removeListeners.forEach((removeListener) => {
        removeListener()
      })
    }
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemIds((prevState) => [...prevState, id])
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
