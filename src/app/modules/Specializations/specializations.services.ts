/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Specialization } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/paginations'
import { ISpecializationFilterRequest } from './specializations.interface'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { generateOrOptions } from '../Doctors/doctors.utils'
import { SpecializationSearchAbleFields } from './specialization.constant'

const createSpecialization = async (data: Specialization) => {
  const result = await prisma.specialization.create({
    data,
  })

  return result
}

const getSpecializations = async (
  filters: ISpecializationFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Specialization[]>> => {
  const { skip, page, limit } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  let andConditions: any[] = []

  //another way we can do this if nested route not available

  // if (searchTerm) {
  //   andConditions.push({
  //     OR: studentSearchableFields.map(field => ({
  //       [field]: {
  //         contains: searchTerm,
  //         mode: 'insensitive',
  //       },
  //     })),
  //   });
  // }

  if (searchTerm) {
    andConditions = [
      ...andConditions,
      generateOrOptions(SpecializationSearchAbleFields, searchTerm),
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

  const whereConditions: Prisma.SpecializationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.specialization.findMany({
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

  const total = await prisma.specialization.count({
    where: whereConditions,
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
const getSpecialization = async (
  id: string,
): Promise<Specialization | null> => {
  const result = await prisma.specialization.findFirst({
    where: {
      id,
    },
  })

  return result
}

const updateSpecialization = async (
  id: string,
  payload: Partial<Specialization>,
): Promise<Partial<Specialization>> => {
  const result = await prisma.specialization.update({
    where: {
      id,
    },
    data: payload,
  })

  return result
}
const deleteSpecialization = async (
  id: string,
): Promise<Specialization | null> => {
  const result = await prisma.specialization.delete({
    where: {
      id,
    },
  })

  return result
}

export const specializationService = {
  createSpecialization,
  getSpecializations,
  getSpecialization,
  deleteSpecialization,
  updateSpecialization,
}
