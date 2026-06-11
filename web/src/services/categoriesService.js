import { categoryMapper } from './mappers/categoryMapper'
import { HttpClient } from './utils/httpClient'

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_API_URL)
  }

  async listCategories(signal) {
    const categories = await this.httpClient.get({
      path: '/categories',
      options: {
        signal,
      },
    })

    return categories.map(categoryMapper.toDomain)
  }
}

export const categoriesService = new CategoriesService()
