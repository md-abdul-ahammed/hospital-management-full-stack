/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicalProfile } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'

// const createMedicalProfile = async (data: MedicalProfile) => {
//   const result = await prisma.medicalProfile.create({
//     data,
//   })
//   return result
// }

const getMedicalProfiles = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<MedicalProfile[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  // const { searchTerm, ...filterData } = filters

  // let andConditions: any[] = []

  // if (searchTerm) {
  //   andConditions = [
  //     ...andConditions,
  //     generateOrOptions(MedicalProfileSearchAbleFields, searchTerm),
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

  // const whereConditions: Prisma.MedicalProfileWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.medicalProfile.count()

  const result = await prisma.medicalProfile.findMany({
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

const getMedicalProfile = async (
  id: string,
): Promise<MedicalProfile | null> => {
  const result = await prisma.medicalProfile.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateMedicalProfile = async (
  id: string,
  payload: Partial<MedicalProfile>,
): Promise<Partial<MedicalProfile>> => {
  const result = await prisma.medicalProfile.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteMedicalProfile = async (
  id: string,
): Promise<MedicalProfile | null> => {
  const result = await prisma.medicalProfile.delete({
    where: {
      id,
    },
  })
  return result
}

export const medicalProfileService = {
  // createMedicalProfile,
  getMedicalProfiles,
  getMedicalProfile,
  deleteMedicalProfile,
  updateMedicalProfile,
}
