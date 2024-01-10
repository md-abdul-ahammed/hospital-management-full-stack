import { Request, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { appointmentService } from './appointments.services'

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const { patientId, availableServiceId, appointmentDate } = req.body
  const result = await appointmentService.bookAppointment(
    patientId,
    availableServiceId,
    appointmentDate,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment booked successfully',
  })
})

const startAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.startAppointment(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment started successfully',
  })
})

const cancleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.cancleBooking(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment cancelled successfully',
  })
})
const finishedAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.finishedAppointment(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment finished successfully',
  })
})

const getAppointments = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await appointmentService.getAppointments(options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Appointment fetched successfully',
  })
})
const getAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.getAppointment(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment fetched successfully',
  })
})
const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.updateAppointment(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment updated successfully',
  })
})
const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await appointmentService.deleteAppointment(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Appointment deleted successfully',
  })
})

export const appointmentController = {
  bookAppointment,
  getAppointment,
  getAppointments,
  updateAppointment,
  startAppointment,
  deleteAppointment,
  cancleBooking,
  finishedAppointment,
}
