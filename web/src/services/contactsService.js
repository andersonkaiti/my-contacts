import { contactMapper } from './mappers/contactMapper'
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
    // O Data Mapper é implementado aqui para acoplar a lógica apenas no
    // service, e não no componente de interface
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
