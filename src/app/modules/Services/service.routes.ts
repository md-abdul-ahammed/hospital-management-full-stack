import express from 'express'
import { serviceController } from './service.controller'
const router = express.Router()

router.get('/', serviceController.getServices)
router.get('/:id', serviceController.getService)
router.patch('/:id', serviceController.updateService)
router.delete('/:id', serviceController.deleteService)

router.post('/create-service', serviceController.createService)

export const serviceRoutes = router
