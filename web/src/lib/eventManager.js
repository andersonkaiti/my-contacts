export class EventManager {
  constructor() {
    this.listeners = {}
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(listener)
  }

  emit(event, payload) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach((listener) => {
      listener(payload)
    })
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners[event]

    if (!listeners) {
      return
    }

    this.listeners[event] = listeners.filter(
      (listener) => listener !== listenerToRemove,
    )
  }
}

const toastEventManager = new EventManager()

function addToast1(payload) {
  console.log('addtoast listener1', payload)
}

function addToast2(payload) {
  console.log('addtoast listener2', payload)
}

toastEventManager.on('addtoast', addToast1)
toastEventManager.on('addtoast', addToast2)

toastEventManager.emit('addtoast', {
  type: 'success',
  message: 'Contato salvo com sucesso!',
})

toastEventManager.removeListener('addtoast', addToast1)

toastEventManager.emit('addtoast', 'after remove listener')
