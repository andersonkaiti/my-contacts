import { APIError } from '../../errors/apiError'

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get({ path, searchParams = {} }) {
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

  async post({ path, body }) {
    const url = new URL(this.baseURL)

    url.pathname = path

    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    // O HTTP, Hypertext Transfer Protocol, é um protocolo de transferência de
    // hipertexto, então não é possível enviar um objeto JavaScript, mas sim
    // uma string JSON.
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

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
