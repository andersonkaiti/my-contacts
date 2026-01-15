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

    // Os códigos de status HTTP são retornados como resposta e servem para identificar se a requisição foi bem-sucedida ou não

    // Um erro pode ser causado por:
    // - Tentar acessar um servidor que não existe
    // - Erro de CORS
    // - Caso um endpoint 404 retorne um HTML em vez de JSON

    // O papel da fetch API é apenas fazer a requisição, e não rejeitar promises

    const response = await fetch(url)

    // A propriedade ok verifica se o código de status HTTP está entre 200 e 299
    if (!response.ok) {
      // Quando um erro é lançado, ele vai descendo a Call Stack até encontrar o bloco catch
      throw new Error(`${response.status} - ${response.statusText}`)
    }

    return response.json()
  }
}

export { HttpClient }
