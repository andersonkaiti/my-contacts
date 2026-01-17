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

    // Headers são case insensitive
    const contentType = response.headers.get('content-type')

    if (contentType.includes('application/json')) {
      data = await response.json()
    }

    if (!response.ok) {
      throw new Error(
        data?.error || `${response.status} ${response.statusText}`,
      )
    }

    return data
  }
}

export { HttpClient }
