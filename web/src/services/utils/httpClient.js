import { APIError } from '../../errors/apiError'

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get({ path, searchParams = {}, options = {} }) {
    return this.makeRequest({
      path,
      searchParams,
      options: {
        method: 'GET',
        headers: options.headers,
      },
    })
  }

  post({ path, options = {}, searchParams = {} }) {
    return this.makeRequest({
      path,
      searchParams,
      options: {
        method: 'POST',
        body: options.body,
        headers: options.headers,
      },
    })
  }

  async makeRequest({ path, searchParams, options }) {
    const url = new URL(this.baseURL)

    url.pathname = path

    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value)
    }

    const headers = new Headers()

    // É necessário verificar se o body existe, pois se a requisição for GET,
    // ela deixará de ser uma requisição simples e o preflight request
    // será feito, gerando uma requisição desnecessária
    if (options.body) {
      headers.set('Content-Type', 'application/json')
    }

    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers.append(key, value)
      }
    }

    const response = await fetch(url, {
      method: options.method,
      headers,
      body: JSON.stringify(options.body),
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
