import { Request, Response } from 'express'
import catchAsync from '../../shared/catchAsync'
import { authService } from './auth.services'
import sendResponse from '../../shared/sendResponse'
import httpStatus from 'http-status'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await authService.loginUser(loginData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'User logged in successfully',
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  const result = await authService.refreshToken(token!)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Token Refreshed successfully',
  })
})

export const authController = {
  loginUser,
  refreshToken,
}
