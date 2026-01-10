const ONE_SECOND = 60
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const TWO_HOURS = ONE_HOUR * 2

export function corsMiddleware(_request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Max-Age', TWO_HOURS)

  next()
}
