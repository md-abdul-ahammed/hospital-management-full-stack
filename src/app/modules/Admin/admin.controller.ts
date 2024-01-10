import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { adminService } from './admin.services'
import pick from '../../shared/pick'
import { AdminFilterAbleFields } from './admin.constant'
import catchAsync from '../../shared/catchAsync'
import sendResponse from '../../shared/sendResponse'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.createAdmin(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Admin created successfully',
  })
})
const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminFilterAbleFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await adminService.getAdmins(filters, options)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    message: 'Admins fetched successfully',
  })
})
const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAdmin(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Admin fetched successfully',
  })
})
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateAdmin(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Admin updated successfully',
  })
})
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.deleteAdmin(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Admin deleted successfully',
  })
})

export const adminController = {
  createAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
}
