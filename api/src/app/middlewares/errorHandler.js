export function errorHandler(error, _request, response, _next) {
  console.log('##### Error handler')
  console.log(error)
  response.sendStatus(500)
}
