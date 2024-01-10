import express from 'express'
import { patientController } from './patients.controller'
const router = express.Router()

router.get('/', patientController.getPatients)
router.get('/:id', patientController.getPatient)
router.patch('/:id', patientController.updatePatient)
router.delete('/:id', patientController.deletePatient)

router.post('/create-patient', patientController.createPatient)

export const patientRoutes = router
