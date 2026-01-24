import { contactRepository } from '../repositories/contact-repository.js'
import { isValidUUID } from '../utils/isValidUUID.js'

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query

    const contacts = await contactRepository.findAll(orderBy)

    response.status(200).json(contacts)
  }

  async show(request, response) {
    const { id } = request.params

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    const contact = await contactRepository.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' })
    }

    response.status(200).json(contact)
  }

  async store(request, response) {
    const { name, email, phone, category_id = null } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' })
    }

    if (email) {
      const contactExists = await contactRepository.findByEmail(email)

      if (contactExists) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already in use' })
      }
    }

    const contact = await contactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    })

    response.status(201).json(contact)
  }

  async update(request, response) {
    const { id } = request.params
    const { name, email, phone, category_id } = request.body

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    if (email) {
      const contactExists = await contactRepository.findById(id)

      if (!contactExists) {
        return response.status(404).json({ error: 'Contact not found' })
      }
    }

    const contactByEmail = await contactRepository.findByEmail(email)

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' })
    }

    const contact = await contactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    })

    response.status(200).json(contact)
  }

  async delete(request, response) {
    const { id } = request.params

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' })
    }

    await contactRepository.delete(id)

    response.sendStatus(204)
  }
}

export const contactController = new ContactController()
