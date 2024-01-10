/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableDoctor } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'

const createAvailableDoctor = async (data: AvailableDoctor) => {
  const result = await prisma.availableDoctor.create({
    data,
  })
  return result
}

const getAvailableDoctors = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<AvailableDoctor[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  // const { searchTerm, ...filterData } = filters

  // let andConditions: any[] = []

  // if (searchTerm) {
  //   andConditions = [
  //     ...andConditions,
  //     generateOrOptions(DoctorSearchAbleFields, searchTerm),
  //   ]
  // }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map(key => ({
  //       [key]: {
  //         equals: (filterData as any)[key],
  //       },
  //     })),
  //   })
  // }

  // const whereConditions: Prisma.DoctorWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.availableDoctor.count({
    // where: whereConditions,
  })

  const result = await prisma.availableDoctor.findMany({
    // where: whereConditions,
    // include: {
    //   specialization: true,
    // },
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

const getAvailableDoctor = async (
  id: string,
): Promise<AvailableDoctor | null> => {
  const result = await prisma.availableDoctor.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateAvailableDoctor = async (
  id: string,
  payload: Partial<AvailableDoctor>,
): Promise<Partial<AvailableDoctor>> => {
  const result = await prisma.availableDoctor.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteAvailableDoctor = async (
  id: string,
): Promise<AvailableDoctor | null> => {
  const result = await prisma.availableDoctor.delete({
    where: {
      id,
    },
  })
  return result
}

export const availableDoctorService = {
  createAvailableDoctor,
  getAvailableDoctors,
  getAvailableDoctor,
  deleteAvailableDoctor,
  updateAvailableDoctor,
}
