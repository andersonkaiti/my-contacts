import { HttpClient } from './utils/httpClient'

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listCategories() {
    return this.httpClient.get({
      path: '/categories',
    })
  }
}

export const categoriesService = new CategoriesService()
