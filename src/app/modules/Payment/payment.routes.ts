import express from 'express'
import { paymentController } from './payment.controller'
const router = express.Router()

router.get('/', paymentController.getPayments)
router.get('/:id', paymentController.getPayment)
router.patch('/:id', paymentController.updatePayment)
router.delete('/:id', paymentController.deletePayment)

router.post('/create-payment', paymentController.createPayment)

export const paymentRoutes = router
