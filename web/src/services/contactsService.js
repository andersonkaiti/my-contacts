class ContactsService {
  async listContacts(orderBy = 'asc') {
    const url = new URL('http://localhost:3001/contacts')
    url.searchParams.set('orderBy', orderBy)

    const response = await fetch(url)

    return response.json()
  }
}

export const contactService = new ContactsService()
