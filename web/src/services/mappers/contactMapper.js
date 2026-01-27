// Data Mapper Pattern:
// Serve para transferir dados de forma bidirecional entre as camadas de domínio (origem)
// e persistência (destino)
// Front-end (origem) -> Back-end (destino)
// Back-end (origem) -> Front-end (destino)
// Back-end (origem) -> Banco de dados (destino)

class ContactMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    }
  }

  // toDomain(persistenceContact) {
  //   return {}
  // }
}

export const contactMapper = new ContactMapper()
