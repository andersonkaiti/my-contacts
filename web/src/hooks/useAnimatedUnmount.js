import { useEffect, useRef, useState } from 'react'

export function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible)
  const animatedElementRef = useRef(null)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
    }

    function handleAnimationEnd() {
      setShouldRender(false)
    }

    const animatedElement = animatedElementRef.current

    if (!visible && animatedElement) {
      animatedElement.addEventListener('animationend', handleAnimationEnd)
    }

    return () => {
      if (animatedElement) {
        animatedElement.removeEventListener('animationend', handleAnimationEnd)
      }
    }
  }, [visible])

  return {
    shouldRender,
    animatedElementRef,
  }
}
