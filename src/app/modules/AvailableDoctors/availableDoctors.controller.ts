import { Request, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { availableDoctorService } from './availableDoctors.services'

const createAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorService.createAvailableDoctor(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Available Doctor created successfully',
    })
  },
)
const getAvailableDoctors = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await availableDoctorService.getAvailableDoctors(options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Available Doctors fetched successfully',
  })
})
const getAvailableDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await availableDoctorService.getAvailableDoctor(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Available Doctor fetched successfully',
  })
})
const updateAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorService.updateAvailableDoctor(
      req.params.id,
      req.body,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Available Doctor updated successfully',
    })
  },
)
const deleteAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableDoctorService.deleteAvailableDoctor(
      req.params.id,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Available Doctor deleted successfully',
    })
  },
)

export const availableDoctorController = {
  createAvailableDoctor,
  getAvailableDoctor,
  getAvailableDoctors,
  updateAvailableDoctor,
  deleteAvailableDoctor,
}
