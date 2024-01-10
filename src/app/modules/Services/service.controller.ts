import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { serviceService } from './service.services'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { ServiceFilterAbleFields } from './service.constant'

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.createService(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Service created successfully',
  })
})
const getServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ServiceFilterAbleFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await serviceService.getServices(filters, options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Services fetched successfully',
  })
})
const getService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getService(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Service fetched successfully',
  })
})
const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.updateService(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Service updated successfully',
  })
})
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.deleteService(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Service deleted successfully',
  })
})

export const serviceController = {
  createService,
  getService,
  getServices,
  updateService,
  deleteService,
}
