import { Router } from 'express'
import { contactController } from './app/controllers/contact-controller.js'

const router = Router()

router.get('/contacts', contactController.index)
router.get('/contacts/:id', contactController.show)
router.delete('/contacts/:id', contactController.delete)
router.post('/contacts', contactController.store)

export { router }
