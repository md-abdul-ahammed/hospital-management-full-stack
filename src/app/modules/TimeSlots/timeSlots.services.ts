/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeSlot } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'

const createTimeSlot = async (data: TimeSlot) => {
  const result = await prisma.timeSlot.create({
    data,
  })
  return result
}

const getTimeSlots = async (
  // filters: ITimeSlotFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<TimeSlot[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  // const { searchTerm, ...filterData } = filters

  // let andConditions: any[] = []

  // if (searchTerm) {
  //   andConditions = [
  //     ...andConditions,
  //     generateOrOptions(TimeSlotSearchAbleFields, searchTerm),
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

  // const whereConditions: Prisma.TimeSlotWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.timeSlot.count({
    // where: whereConditions,
  })

  const result = await prisma.timeSlot.findMany({
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

const getTimeSlot = async (id: string): Promise<TimeSlot | null> => {
  const result = await prisma.timeSlot.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateTimeSlot = async (
  id: string,
  payload: Partial<TimeSlot>,
): Promise<Partial<TimeSlot>> => {
  const result = await prisma.timeSlot.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteTimeSlot = async (id: string): Promise<TimeSlot | null> => {
  const result = await prisma.timeSlot.delete({
    where: {
      id,
    },
  })
  return result
}

export const timeSlotService = {
  createTimeSlot,
  getTimeSlots,
  getTimeSlot,
  deleteTimeSlot,
  updateTimeSlot,
}
