import { HttpClient } from './utils/httpClient'

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get({
      path: '/contacts',
      searchParams: {
        orderBy,
      },
    })
  }

  async createContact(contact) {
    return this.httpClient.post({
      path: '/contacts',
      body: contact,
    })
  }
}

export const contactService = new ContactsService()
