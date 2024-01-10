import express from 'express'
import { availableDoctorController } from './availableDoctors.controller'

const router = express.Router()

router.get('/', availableDoctorController.getAvailableDoctors)
router.get('/:id', availableDoctorController.getAvailableDoctor)
router.patch('/:id', availableDoctorController.updateAvailableDoctor)
router.delete('/:id', availableDoctorController.deleteAvailableDoctor)

router.post(
  '/create-available-doctor',
  availableDoctorController.createAvailableDoctor,
)

export const availableDoctorRoutes = router
