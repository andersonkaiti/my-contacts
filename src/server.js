import express from 'express'
import { router } from './routes.js'

const app = express()

app.use(express.json())

app.use(router)

app.use((error, _request, response, _next) => {
  console.log('##### Error handler')
  console.log(error)
  response.sendStatus(500)
})

app.listen(3000, () =>
  console.log('🚀 Server started at http://localhost:3000')
)
