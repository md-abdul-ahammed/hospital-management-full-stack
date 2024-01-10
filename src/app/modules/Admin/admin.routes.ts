import express from 'express'
import { adminController } from './admin.controller'
const router = express.Router()

router.get('/', adminController.getAdmins)
router.get('/:id', adminController.getAdmin)
router.patch('/:id', adminController.updateAdmin)
router.delete('/:id', adminController.deleteAdmin)

router.post('/create-admin', adminController.createAdmin)

export const adminRoutes = router
