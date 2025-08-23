import { randomUUID } from 'node:crypto'
import { db } from '../../database/index.js'

let contacts = [
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
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts')

    return rows
  }

  findById(id) {
    return new Promise((resolve, _reject) =>
      resolve(contacts.find((user) => user.id === id))
    )
  }

  findByEmail(email) {
    return new Promise((resolve, _reject) =>
      resolve(contacts.find((user) => user.email === email))
    )
  }

  delete(id) {
    return new Promise((resolve, _reject) => {
      contacts = contacts.filter((contact) => contact.id !== id)

      resolve()
    })
  }

  async create({ name, email, phone, category_id }) {
    const row = await db.query(
      `
        INSERT INTO contacts (
          name,
          email,
          phone,
          category_id
        ) VALUES (
          $1,
          $2,
          $3,
          $4
        ) RETURNING *
    `,
      [name, email, phone, category_id]
    )

    return row[0]
  }

  update(id, data) {
    return new Promise((resolve, _reject) => {
      const updatedContact = {
        id,
        ...data,
      }

      contacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      )

      resolve(updatedContact)
    })
  }
}

export const contactRepository = new ContactRepository()
