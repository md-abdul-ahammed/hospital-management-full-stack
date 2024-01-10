import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { timeSlotService } from './timeSlots.services'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'

const createTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.createTimeSlot(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'TimeSlot created successfully',
  })
})
const getTimeSlots = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, TimeSlotFilterAbleFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await timeSlotService.getTimeSlots(options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'TimeSlots fetched successfully',
  })
})
const getTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.getTimeSlot(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'TimeSlot fetched successfully',
  })
})
const updateTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.updateTimeSlot(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'TimeSlot updated successfully',
  })
})
const deleteTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await timeSlotService.deleteTimeSlot(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'TimeSlot deleted successfully',
  })
})

export const timeSlotController = {
  createTimeSlot,
  getTimeSlot,
  getTimeSlots,
  updateTimeSlot,
  deleteTimeSlot,
}
