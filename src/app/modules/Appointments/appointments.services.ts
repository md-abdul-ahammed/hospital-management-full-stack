/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'

const bookAppointment = async (
  patientId: string,
  availableServiceId: string,
  appointmentDate: string,
): Promise<any> => {
  // checking if the available service is exist
  const availableService = await prisma.availableService.findUnique({
    where: {
      id: availableServiceId,
    },
  })
  if (!availableService) {
    throw new Error('This service is not available')
  }
  if (availableService.availableSeats === 0) {
    throw new Error('This service is already booked')
  }

  const booking = await prisma.$transaction(async tx => {
    const appointment = await tx.appointment.create({
      data: {
        appointmentDate,
        patientId,
        availableServiceId,
        status: 'pending',
      },
    })

    await tx.availableService.update({
      where: {
        id: availableServiceId,
      },
      data: {
        availableSeats: availableService.availableSeats - 1,
        isBooked: availableService.availableSeats === 0 ? true : false,
      },
    })

    const payment = await tx.payment.create({
      data: {
        amount: availableService.fees,
        paymentStatus: 'pending',
        appointmentId: appointment.id,
      },
    })

    return {
      appointment,
      payment,
    }
  })
  return booking
}

const cancleBooking = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    include: {
      availableServive: true,
    },
  })

  if (!appointment) {
    throw new Error('Appointment Does Not Exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has been already cancelled')
  }
  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been completed')
  }

  const cancelledAppointment = await prisma.$transaction(async tx => {
    const appointmentToCancel = await tx.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: 'cancelled',
      },
    })

    await tx.availableService.update({
      where: {
        id: appointment.availableServiceId,
      },
      data: {
        availableSeats: {
          increment: 1,
        },
        isBooked:
          appointment.availableServive.availableSeats + 1 > 0 ? false : true,
      },
    })

    await tx.payment.update({
      where: {
        appointmentId,
      },
      data: {
        paymentStatus: 'cancelled',
      },
    })

    return {
      appointment: appointmentToCancel,
    }
  })

  return cancelledAppointment
}

const startAppointment = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment Does Not Exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has been already cancelled')
  }
  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been completed')
  }

  const startedAppointment = await prisma.$transaction(async tx => {
    await tx.payment.update({
      where: {
        appointmentId,
      },
      data: {
        paymentStatus: 'paid',
        paymentDate: new Date().toISOString(),
      },
    })

    const appointmentToStart = await tx.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: 'started',
      },
    })

    if (!appointmentToStart) {
      await tx.payment.update({
        where: {
          appointmentId,
        },
        data: {
          paymentStatus: 'refund',
        },
      })
    }

    return appointmentToStart
  })

  return startedAppointment
}

const finishedAppointment = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  })

  if (!appointment) {
    throw new Error('Appointment Does Not Exist')
  }
  if (appointment.status === 'cancelled') {
    throw new Error('Appointment has been already cancelled')
  }
  if (appointment.status === 'finished') {
    throw new Error('Appointment has already been completed')
  }
  const result = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: 'finished',
    },
  })

  return result
}

const getAppointments = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<Appointment[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  // const { searchTerm, ...filterData } = filters

  // let andConditions: any[] = []

  // if (searchTerm) {
  //   andConditions = [
  //     ...andConditions,
  //     generateOrOptions(AppointmentSearchAbleFields, searchTerm),
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

  // const whereConditions: Prisma.AppointmentWhereInput =
  //   andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.appointment.count()

  const result = await prisma.appointment.findMany({
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

const getAppointment = async (id: string): Promise<Appointment | null> => {
  const result = await prisma.appointment.findFirst({
    where: {
      id,
    },
  })
  return result
}

const updateAppointment = async (
  id: string,
  payload: Partial<Appointment>,
): Promise<Partial<Appointment>> => {
  const result = await prisma.appointment.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteAppointment = async (id: string): Promise<Appointment | null> => {
  const result = await prisma.appointment.delete({
    where: {
      id,
    },
  })
  return result
}

export const appointmentService = {
  bookAppointment,
  cancleBooking,
  getAppointments,
  getAppointment,
  startAppointment,
  deleteAppointment,
  updateAppointment,
  finishedAppointment,
}
