/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicalProfile, Patient, Prisma } from '@prisma/client'
import prisma from '../../shared/prisma'
import { IPaginationOptions } from '../../interfaces/paginations'
import { IPatientFilterRequest } from './patients.interface'
import { paginationHelpers } from '../../helpers/paginationHelper'
import { PatientSearchAbleFields } from './patients.constant'
import { IGenericResponse } from '../../interfaces/common'
import { generateOrOptions } from './patients.utils'

const createPatient = async (
  patientData: Patient,
  medicalProfileData: MedicalProfile,
): Promise<any> => {
  const result = await prisma.$transaction(async tx => {
    const createPatient = await tx.patient.create({
      data: patientData,
    })
    const createMedicalProfile = await tx.medicalProfile.create({
      data: {
        ...medicalProfileData,
        patientId: createPatient.id,
        profileStatus: 'active',
      },
    })
    return {
      patient: createPatient,
      medicalProfile: createMedicalProfile,
    }
  })

  return result
}

const getPatients = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Patient[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  let andConditions: any[] = []

  if (searchTerm) {
    andConditions = [
      ...andConditions,
      generateOrOptions(PatientSearchAbleFields, searchTerm),
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

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.patient.count({
    where: whereConditions,
  })

  const result = await prisma.patient.findMany({
    where: whereConditions,
    include: {
      medicalProfile: true,
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

const getPatient = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findFirst({
    where: {
      id,
    },
    include: {
      medicalProfile: true,
    },
  })
  return result
}

const updatePatient = async (
  id: string,
  payload: Partial<Patient>,
): Promise<Partial<Patient>> => {
  const result = await prisma.patient.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deletePatient = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.delete({
    where: {
      id,
    },
  })
  return result
}

export const patientService = {
  createPatient,
  getPatients,
  getPatient,
  deletePatient,
  updatePatient,
}
