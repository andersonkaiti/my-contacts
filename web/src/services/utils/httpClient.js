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

    return response.json()
  }
}

// Apenas a classe, e não a instância, será exportada, para permitir que o baseurl seja configurado
export { HttpClient }
