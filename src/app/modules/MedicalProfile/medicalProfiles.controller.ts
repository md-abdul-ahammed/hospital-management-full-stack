import { Request, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { medicalProfileService } from './medicalProfiles.services'

// const createMedicalProfile = catchAsync(async (req: Request, res: Response) => {
//   const result = await medicalProfileService.createMedicalProfile(req.body)

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     data: result,
//     message: 'MedicalProfile created successfully',
//   })
// })
const getMedicalProfiles = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await medicalProfileService.getMedicalProfiles(options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Medical profiles fetched successfully',
  })
})
const getMedicalProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await medicalProfileService.getMedicalProfile(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Medical profile fetched successfully',
  })
})
const updateMedicalProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await medicalProfileService.updateMedicalProfile(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Medical profile updated successfully',
  })
})
const deleteMedicalProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await medicalProfileService.deleteMedicalProfile(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Medical profile deleted successfully',
  })
})

export const medicalProfileController = {
  // createMedicalProfile,
  getMedicalProfile,
  getMedicalProfiles,
  updateMedicalProfile,
  deleteMedicalProfile,
}
