import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paymentService } from './payment.services'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.createPayment(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment created successfully',
  })
})
const getPayments = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await paymentService.getPayments(options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Payments fetched successfully',
  })
})
const getPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getPayment(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment fetched successfully',
  })
})
const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.updatePayment(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment updated successfully',
  })
})
const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.deletePayment(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment deleted successfully',
  })
})

export const paymentController = {
  createPayment,
  getPayment,
  getPayments,
  updatePayment,
  deletePayment,
}
