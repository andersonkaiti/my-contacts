import { categoryRepository } from '../repositories/category-repository.js'

class CategoryController {
  async index(_request, response) {
    const categories = await categoryRepository.findAll()

    response.status(200).json(categories)
  }

  async show(request, response) {
    const { id } = request.params

    const category = await categoryRepository.findById(id)

    if (!category) {
      return response.status(404).json({ error: 'Category not found' })
    }

    response.status(200).json(category)
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const category = await categoryRepository.create({
      name,
    })

    response.status(201).json(category)
  }
}

export const categoryController = new CategoryController()
