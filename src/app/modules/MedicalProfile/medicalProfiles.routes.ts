import express from 'express'
import { medicalProfileController } from './medicalProfiles.controller'

const router = express.Router()

router.get('/', medicalProfileController.getMedicalProfiles)
router.get('/:id', medicalProfileController.getMedicalProfile)
router.patch('/:id', medicalProfileController.updateMedicalProfile)
router.delete('/:id', medicalProfileController.deleteMedicalProfile)

// router.post(
//   '/create-medical-profile',
//   medicalProfileController.createMedicalProfile,
// )

export const medicalProfileRoutes = router
