import { randomUUID } from 'node:crypto'

const contacts = [
  {
    id: randomUUID(),
    name: 'Anderson',
    email: 'anderkaiti@gmail.com',
    phone: '123123123',
    category_id: randomUUID(),
  },
  {
    id: randomUUID(),
    name: 'José',
    email: 'jose@gmail.com',
    phone: '321321321',
    category_id: randomUUID(),
  },
]

class ContactRepository {
  findAll() {
    return new Promise((resolve, _reject) => resolve(contacts))
  }

  findById(id) {
    return new Promise((resolve, _reject) =>
      resolve(contacts.find((user) => user.id === id))
    )
  }
}

export const contactRepository = new ContactRepository()
