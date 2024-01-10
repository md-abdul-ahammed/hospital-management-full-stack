/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { specializationRoutes } from '../modules/Specializations/specializations.routes'
import { doctorRoutes } from '../modules/Doctors/doctors.routes'
import { patientRoutes } from '../modules/Patients/patients.routes'
import { medicalProfileRoutes } from '../modules/MedicalProfile/medicalProfiles.routes'
import { appointmentRoutes } from '../modules/Appointments/appointments.routes'
import { availableDoctorRoutes } from '../modules/AvailableDoctors/availableDoctors.routes'
import { availableServiceRoutes } from '../modules/AvailableServices/availableService.routes'
import { timeSlotRoutes } from '../modules/TimeSlots/timeSlots.routes'
import { serviceRoutes } from '../modules/Services/service.routes'
import { adminRoutes } from '../modules/Admin/admin.routes'
import { paymentRoutes } from '../modules/Payment/payment.routes'
import { authRoutes } from '../modules/Auth/auth.routes'

const router = express.Router()

const moduleRoutes: any[] = [
  { path: '/specializations', route: specializationRoutes },
  { path: '/doctors', route: doctorRoutes },
  { path: '/patients', route: patientRoutes },
  { path: '/medical-profiles', route: medicalProfileRoutes },
  { path: '/medical-appointments', route: appointmentRoutes },
  { path: '/available-doctors', route: availableDoctorRoutes },
  { path: '/available-services', route: availableServiceRoutes },
  { path: '/time-slots', route: timeSlotRoutes },
  { path: '/services', route: serviceRoutes },
  { path: '/admins', route: adminRoutes },
  { path: '/payments', route: paymentRoutes },
  { path: '/auth', route: authRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
