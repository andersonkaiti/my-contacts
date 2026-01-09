export function corsMiddleware(_request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*')

  next()
}
