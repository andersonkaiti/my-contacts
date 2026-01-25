export function toast({ type = 'success', text = '' }) {
  // O nome do evento é case sensitive
  // new Event -> para criar um evento sem enviar dados
  // new CustomEvent -> para criar um evento com dados
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  })

  document.dispatchEvent(event)
}
