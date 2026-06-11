import { contactMapper } from './mappers/contactMapper'
import { HttpClient } from './utils/httpClient'

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL)
  }

  async listContacts(orderBy = 'asc', signal) {
    const contacts = await this.httpClient.get({
      path: '/contacts',
      searchParams: {
        orderBy,
      },
      options: {
        signal,
      },
    })

    return contacts.map(contactMapper.toDomain)
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get({
      path: `/contacts/${id}`,
      options: {
        signal,
      },
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
