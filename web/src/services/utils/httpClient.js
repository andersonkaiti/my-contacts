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
        signal: options.signal,
      },
    })
  }

  post({ path, searchParams = {}, options = {} }) {
    return this.makeRequest({
      path,
      searchParams,
      options: {
        method: 'POST',
        body: options.body,
        headers: options.headers,
        signal: options.signal,
      },
    })
  }

  put({ path, searchParams = {}, options = {} }) {
    return this.makeRequest({
      path,
      searchParams,
      options: {
        method: 'PUT',
        body: options.body,
        headers: options.headers,
        signal: options.signal,
      },
    })
  }

  delete({ path, searchParams = {}, options = {} }) {
    return this.makeRequest({
      path,
      searchParams,
      options: {
        method: 'DELETE',
        headers: options.headers,
        signal: options.signal,
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
      signal: options.signal,
    })

    let data = null

    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      data = await response.json()
    }

    if (!response.ok) {
      throw new APIError(response, data)
    }

    return data
  }
}

export { HttpClient }
