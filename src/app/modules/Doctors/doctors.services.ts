/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doctor, Prisma } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { IDoctorFilterRequest } from './doctors.interface'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { DoctorSearchAbleFields } from './doctors.constant'
import { IGenericResponse } from '../../interfaces/common'
import { generateOrOptions } from './doctors.utils'

const createDoctor = async (data: Doctor) => {
  const result = await prisma.doctor.create({
    data,
  })
  return result
}

const getDoctors = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Doctor[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  let andConditions: any[] = []

  if (searchTerm) {
    andConditions = [
      ...andConditions,
      generateOrOptions(DoctorSearchAbleFields, searchTerm),
    ]
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.doctor.count({
    where: whereConditions,
  })

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    include: {
      specialization: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'asc',
          },
  })

  return {
    meta: {
      total: total,
      page,
      limit,
    },
    data: result,
  }
}

const getDoctor = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateDoctor = async (
  id: string,
  payload: Partial<Doctor>,
): Promise<Partial<Doctor>> => {
  const result = await prisma.doctor.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteDoctor = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.delete({
    where: {
      id,
    },
  })
  return result
}

export const doctorService = {
  createDoctor,
  getDoctors,
  getDoctor,
  deleteDoctor,
  updateDoctor,
}
