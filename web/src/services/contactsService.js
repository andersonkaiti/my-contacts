import { HttpClient } from './utils/httpClient'

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get({
      path: '/contacts',
      searchParams: {
        orderBy,
      },
    })
  }

  getContactById(id) {
    return this.httpClient.get({
      path: `/contacts/${id}`,
    })
  }

  createContact(contact) {
    return this.httpClient.post({
      path: '/contacts',
      options: {
        body: contact,
      },
    })
  }
}

export const contactService = new ContactsService()
