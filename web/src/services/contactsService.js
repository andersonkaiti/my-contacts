import { contactMapper } from './mappers/contactMapper'
import { HttpClient } from './utils/httpClient'

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get({
      path: '/contacts',
      searchParams: {
        orderBy,
      },
    })

    return contacts.map(contactMapper.toDomain)
  }

  async getContactById(id) {
    const contact = await this.httpClient.get({
      path: `/contacts/${id}`,
    })

    return contactMapper.toDomain(contact)
  }

  createContact(contact) {
    const body = contactMapper.toPersistence(contact)

    return this.httpClient.post({
      path: '/contacts',
      options: {
        body,
      },
    })
  }

  updateContact(id, contact) {
    const body = contactMapper.toPersistence(contact)

    return this.httpClient.put({
      path: `/contacts/${id}`,
      options: {
        body,
      },
    })
  }

  deleteContact(id) {
    return this.httpClient.delete({
      path: `/contacts/${id}`,
    })
  }
}

export const contactService = new ContactsService()
