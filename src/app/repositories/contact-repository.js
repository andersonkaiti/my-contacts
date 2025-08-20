import { randomUUID } from 'node:crypto'

const contacts = [
  {
    id: randomUUID(),
    name: 'Anderson',
    email: 'anderkaiti@gmail.com',
    phone: '123123123',
    category_id: randomUUID(),
  },
]

class ContactRepository {
  findAll() {
    return new Promise((resolve, _reject) => resolve(contacts))
  }
}

export const contactRepository = new ContactRepository()
