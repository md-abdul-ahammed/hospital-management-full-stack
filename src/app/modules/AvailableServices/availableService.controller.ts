import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { availableServiceService } from './availableService.services'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'

const createAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableServiceService.createAvailableService(
      req.body,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Available Service created successfully',
    })
  },
)
const getAvailableServices = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await availableServiceService.getAvailableServices(options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Available Services fetched successfully',
  })
})
const getAvailableService = catchAsync(async (req: Request, res: Response) => {
  const result = await availableServiceService.getAvailableService(
    req.params.id,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Available Service fetched successfully',
  })
})
const updateAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableServiceService.updateAvailableService(
      req.params.id,
      req.body,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Available Service updated successfully',
    })
  },
)
const deleteAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availableServiceService.deleteAvailableService(
      req.params.id,
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Available Service deleted successfully',
    })
  },
)

export const availableServiceController = {
  createAvailableService,
  getAvailableService,
  getAvailableServices,
  updateAvailableService,
  deleteAvailableService,
}
