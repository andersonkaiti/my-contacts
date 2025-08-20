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

  async store(request, response) {
    const { name, email, phone, category_id } = request.body

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
