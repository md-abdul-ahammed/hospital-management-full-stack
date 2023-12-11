import { Request, Response } from 'express'
import { specializationService } from './specializations.services'
import httpStatus from 'http-status'
import pick from '../../shared/pick'
import { SpecializationFilterAbleFields } from './specialization.constant'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'

const createSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationService.createSpecialization(req.body)
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Specialization created successfully',
  })
})

const getSpecializations = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SpecializationFilterAbleFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await specializationService.getSpecializations(
    filters,
    options,
  )

  sendResponse(res, {
    success: true,
    meta: result.meta,
    data: result.data,
    statusCode: httpStatus.OK,
    message: 'Specializations fetched successfully',
  })
})

const getSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationService.getSpecialization(req.params.id)

  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Specialization fetched successfully',
  })
})

const updateSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationService.updateSpecialization(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Specialization updated successfully',
  })
})
const deleteSpecialization = catchAsync(async (req: Request, res: Response) => {
  const result = await specializationService.deleteSpecialization(req.params.id)

  sendResponse(res, {
    success: true,
    data: result,
    statusCode: httpStatus.OK,
    message: 'Specialization deleted successfully',
  })
})

export const specializationController = {
  createSpecialization,
  getSpecializations,
  updateSpecialization,
  deleteSpecialization,
  getSpecialization,
}
