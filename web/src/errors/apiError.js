export class APIError extends Error {
  constructor(response, data) {
    super()

    this.name = 'APIError'
    this.response = response
    this.data = data
    this.message = data?.error || `${response.status} ${response.statusText}`
  }
}
