const ONE_SECOND = 60
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const TWO_HOURS = ONE_HOUR * 2

export function corsMiddleware(request, response, next) {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002']

  const origin = request.header('origin')

  const isAllowed = allowedOrigins.includes(origin)

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Access-Control-Allow-Methods', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    response.setHeader('Access-Control-Max-Age', TWO_HOURS)
  }

  next()
}
