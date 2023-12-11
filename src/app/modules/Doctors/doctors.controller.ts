import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { doctorService } from './doctors.services'
import pick from '../../shared/pick'
import { DoctorFilterAbleFields } from './doctors.constant'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.createDoctor(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Doctor created successfully',
  })
})
const getDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, DoctorFilterAbleFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await doctorService.getDoctors(filters, options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Doctors fetched successfully',
  })
})
const getDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.getDoctor(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Doctor fetched successfully',
  })
})
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.updateDoctor(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Doctor updated successfully',
  })
})
const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorService.deleteDoctor(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Doctor deleted successfully',
  })
})

export const doctorController = {
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
}
