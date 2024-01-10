/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Service } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { IServiceFilterRequest } from './service.interface'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { ServiceSearchAbleFields } from './service.constant'
import { IGenericResponse } from '../../interfaces/common'
import { generateOrOptions } from './service.utils'

const createService = async (data: Service) => {
  const result = await prisma.service.create({
    data,
  })
  return result
}

const getServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Service[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  let andConditions: any[] = []

  if (searchTerm) {
    andConditions = [
      ...andConditions,
      generateOrOptions(ServiceSearchAbleFields, searchTerm),
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.service.count({
    where: whereConditions,
  })

  const result = await prisma.service.findMany({
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

const getService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateService = async (
  id: string,
  payload: Partial<Service>,
): Promise<Partial<Service>> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  })
  return result
}

export const serviceService = {
  createService,
  getServices,
  getService,
  deleteService,
  updateService,
}
