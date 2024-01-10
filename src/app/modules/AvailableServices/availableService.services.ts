/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailableService } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'

const createAvailableService = async (data: AvailableService) => {
  const result = await prisma.availableService.create({
    data,
  })
  return result
}

const getAvailableServices = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<AvailableService[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  // const { searchTerm, ...filterData } = filters

  // let andConditions: any[] = []

  // if (searchTerm) {
  //   andConditions = [
  //     ...andConditions,
  //     generateOrOptions(AvailableServiceSearchAbleFields, searchTerm),
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

  // const whereConditions: Prisma.AvailableServiceWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.availableService.count({
    // where: whereConditions,
  })

  const result = await prisma.availableService.findMany({
    // where: whereConditions,
    include: {
      service: true,
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

const getAvailableService = async (
  id: string,
): Promise<AvailableService | null> => {
  const result = await prisma.availableService.findFirst({
    include: {
      service: true,
    },
    where: {
      id,
    },
  })
  return result
}

const updateAvailableService = async (
  id: string,
  payload: Partial<AvailableService>,
): Promise<Partial<AvailableService>> => {
  const result = await prisma.availableService.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteAvailableService = async (
  id: string,
): Promise<AvailableService | null> => {
  const result = await prisma.availableService.delete({
    where: {
      id,
    },
  })
  return result
}

export const availableServiceService = {
  createAvailableService,
  getAvailableServices,
  getAvailableService,
  deleteAvailableService,
  updateAvailableService,
}
