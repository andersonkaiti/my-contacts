export function toast({ type = 'success', text = '' }) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  })

  document.dispatchEvent(event)
}
