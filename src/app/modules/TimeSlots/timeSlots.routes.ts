import express from 'express'
import { timeSlotController } from './timeSlots.controller'
const router = express.Router()

router.get('/', timeSlotController.getTimeSlots)
router.get('/:id', timeSlotController.getTimeSlot)
router.patch('/:id', timeSlotController.updateTimeSlot)
router.delete('/:id', timeSlotController.deleteTimeSlot)

router.post('/create-time-slot', timeSlotController.createTimeSlot)

export const timeSlotRoutes = router
