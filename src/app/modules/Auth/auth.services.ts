/* eslint-disable @typescript-eslint/no-unused-vars */
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../helpers/jwtHelper'
import prisma from '../../shared/prisma'

const loginUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  let isUserExist

  const doctor = await prisma.doctor.findUnique({
    where: {
      email,
    },
  })
  const patient = await prisma.patient.findUnique({
    where: {
      email,
    },
  })
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })

  if (!admin && !doctor && !patient) {
    throw new Error('User does not exist')
  }

  if (admin || doctor || patient) {
    isUserExist = admin || doctor || patient
  }
  if (isUserExist && isUserExist?.password !== password) {
    throw new Error('Password is incorrect')
  }
  const payloadData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    fullName: isUserExist!.fullName,
    id: isUserExist!.id,
  }

  console.log(payloadData)

  //create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt_secret as Secret,
    config.expires_in as string,
  )
  return { accessToken }
}
const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required')
  }

  const decodeToken = jwtHelpers.decodeToken(token)
  const { email, role, fullName, phoneNumber } = decodeToken

  if (!email || !role || !fullName || !phoneNumber) {
    throw new Error('Token is invalid')
  }

  const doctor = await prisma.doctor.findUnique({
    where: {
      email,
    },
  })
  const patient = await prisma.patient.findUnique({
    where: {
      email,
    },
  })
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  })

  if (!admin && !doctor && !patient) {
    throw new Error('User does not exist')
  }

  const newAccessToken = jwtHelpers.createToken(
    { email, phoneNumber, role, fullName },
    config.jwt_secret as Secret,
    config.expires_in as string,
  )

  return { accessToken: newAccessToken }
}
export const authService = {
  loginUser,
  refreshToken,
}
