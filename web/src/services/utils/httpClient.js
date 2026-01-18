import { APIError } from '../../errors/apiError'

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get({ path, searchParams }) {
    const url = new URL(this.baseURL)

    url.pathname = path

    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value)
    }

    const response = await fetch(url)

    let data = null

    const contentType = response.headers.get('content-type')

    if (contentType.includes('application/json')) {
      data = await response.json()
    }

    if (!response.ok) {
      throw new APIError(response, data)
    }

    return data
  }
}

export { HttpClient }
