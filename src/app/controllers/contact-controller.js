import { contactRepository } from '../repositories/contact-repository.js'

class ContactController {
  async index(_request, response) {
    const contacts = await contactRepository.findAll()

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

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  async delete(request, response) {
    const { id } = request.params

    const contact = await contactRepository.findById(id)

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' })
    }

    await contactRepository.delete(id)

    // 204: No Content
    response.sendStatus(204)
  }
}

export const contactController = new ContactController()
