import express from 'express'
import { availableServiceController } from './availableService.controller'
const router = express.Router()

router.get('/', availableServiceController.getAvailableServices)
router.get('/:id', availableServiceController.getAvailableService)
router.patch('/:id', availableServiceController.updateAvailableService)
router.delete('/:id', availableServiceController.deleteAvailableService)

router.post(
  '/create-available-service',
  availableServiceController.createAvailableService,
)

export const availableServiceRoutes = router
