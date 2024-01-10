import express from 'express'
import { appointmentController } from './appointments.controller'

const router = express.Router()

router.get('/', appointmentController.getAppointments)
router.get('/:id', appointmentController.getAppointment)
router.patch('/:id', appointmentController.updateAppointment)
router.patch('/cancel-booking/:id', appointmentController.cancleBooking)
router.patch('/start-appointment/:id', appointmentController.startAppointment)
router.patch(
  '/finish-appointment/:id',
  appointmentController.finishedAppointment,
)
router.delete('/:id', appointmentController.deleteAppointment)

router.post('/book-appointment', appointmentController.bookAppointment)

export const appointmentRoutes = router
