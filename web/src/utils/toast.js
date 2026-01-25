import { EventManager } from '../lib/eventManager'

export const toastEventManager = new EventManager()

export function toast({ type = 'success', text = '', duration }) {
  toastEventManager.emit('addtoast', {
    type,
    text,
    duration,
  })
}
