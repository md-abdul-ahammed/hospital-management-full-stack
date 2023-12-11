import express from 'express'
import { doctorController } from './doctors.controller'
const router = express.Router()

router.get('/', doctorController.getDoctors)
router.get('/:id', doctorController.getDoctor)
router.patch('/:id', doctorController.updateDoctor)
router.delete('/:id', doctorController.deleteDoctor)

router.post('/create-doctor', doctorController.createDoctor)

export const doctorRoutes = router
