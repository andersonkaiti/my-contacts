import { contactRepository } from '../repositories/contact-repository.js'

// SOP -> Same Origin Policy -> Política de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://domínio:porta

//   Saída: http://localhost:3000
// Destino: http://localhost:3001

// Enquanto o SOP bloqueia a requisições cross-origin, o CORS flexibiliza essa restrição, permitindo que a requisição seja feita

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query

    const contacts = await contactRepository.findAll(orderBy)

    //  Wildcard -> Curinga -> É uma carta que representa qualquer carta (origem)
    // O CORS é um header definido na resposta da api
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.status(200).json(contacts)
  }

  async show(request, response) {
    const { id } = request.params

    const contact = await contactRepository.findById(id)

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' })
    }

    response.status(200).json(contact)
  }

  async store(request, response) {
    const { name, email, phone, category_id = null } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactExists = await contactRepository.findByEmail(email)

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' })
    }

    const contact = await contactRepository.create({
      name,
      email,
      phone,
      category_id,
    })

    response.status(201).json(contact)
  }

  async update(request, response) {
    const { id } = request.params
    const { name, email, phone, category_id } = request.body

    const contactExists = await contactRepository.findById(id)

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const contactByEmail = await contactRepository.findByEmail(email)

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' })
    }

    const contact = await contactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    })

    response.status(200).json(contact)
  }

  async delete(request, response) {
    const { id } = request.params

    await contactRepository.delete(id)

    // 204: No Content
    response.sendStatus(204)
  }
}

export const contactController = new ContactController()
