import express from 'express'
import { corsMiddleware } from './app/middlewares/cors.js'
import { errorHandler } from './app/middlewares/errorHandler.js'
import { router } from './routes.js'

const app = express()

app.use(express.json())

app.use(corsMiddleware)

app.use(router)

app.use(errorHandler)

app.listen(3001, () =>
  console.log('🚀 Server started at http://localhost:3001')
)
