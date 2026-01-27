import { createPortal } from 'react-dom'

export function ReactPortal({ children }) {
  return createPortal(children, document.body)
}
