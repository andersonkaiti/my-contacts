import { contactRepository } from '../repositories/contact-repository.js'

class ContactController {
  async index(_request, response) {
    const contacts = await contactRepository.findAll()

    response.status(200).json(contacts)
  }

  show() {
    // Obter UM registro
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

export const contactController = new ContactController()
