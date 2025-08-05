import { Router } from 'express'
import { contactController } from './app/controllers/contact-controller.js'

const routes = Router()

routes.get('/contacts', contactController.index)

export { routes }
