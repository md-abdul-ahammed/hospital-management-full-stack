/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'

const createPayment = async (data: Payment) => {
  const result = await prisma.payment.create({
    data,
  })
  return result
}

const getPayments = async (
  // filters: IPaymentFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Payment[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  // const { searchTerm, ...filterData } = filters

  // let andConditions: any[] = []

  // if (searchTerm) {
  //   andConditions = [
  //     ...andConditions,
  //     generateOrOptions(PaymentSearchAbleFields, searchTerm),
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

  // const whereConditions: Prisma.PaymentWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.payment.count()

  const result = await prisma.payment.findMany({
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

const getPayment = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updatePayment = async (
  id: string,
  payload: Partial<Payment>,
): Promise<Partial<Payment>> => {
  const result = await prisma.payment.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deletePayment = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.delete({
    where: {
      id,
    },
  })
  return result
}

export const paymentService = {
  createPayment,
  getPayments,
  getPayment,
  deletePayment,
  updatePayment,
}
