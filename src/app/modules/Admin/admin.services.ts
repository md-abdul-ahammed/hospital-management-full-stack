/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin, Prisma } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { IAdminFilterRequest } from './admin.interface'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { AdminSearchAbleFields } from './admin.constant'
import { IGenericResponse } from '../../interfaces/common'
import { generateOrOptions } from './admin.utils'

const createAdmin = async (data: Admin) => {
  const result = await prisma.admin.create({
    data,
  })
  return result
}

const getAdmins = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Admin[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  let andConditions: any[] = []

  if (searchTerm) {
    andConditions = [
      ...andConditions,
      generateOrOptions(AdminSearchAbleFields, searchTerm),
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

  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.admin.count({
    where: whereConditions,
  })

  const result = await prisma.admin.findMany({
    where: whereConditions,
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

const getAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateAdmin = async (
  id: string,
  payload: Partial<Admin>,
): Promise<Partial<Admin>> => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.delete({
    where: {
      id,
    },
  })
  return result
}

export const adminService = {
  createAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
  updateAdmin,
}
