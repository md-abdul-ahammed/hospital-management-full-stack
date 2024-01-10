import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { patientService } from './patients.services'
import pick from '../../shared/pick'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'
import { PatientFilterAbleFields } from './patients.constant'

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const { medicalProfile, ...patientData } = req.body
  const result = await patientService.createPatient(patientData, medicalProfile)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Patient created successfully',
  })
})
const getPatients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PatientFilterAbleFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await patientService.getPatients(filters, options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Patients fetched successfully',
  })
})
const getPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.getPatient(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Patient fetched successfully',
  })
})
const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.updatePatient(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Patient updated successfully',
  })
})
const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await patientService.deletePatient(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Patient deleted successfully',
  })
})

export const patientController = {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
}
