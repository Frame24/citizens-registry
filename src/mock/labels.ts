import type { Gender, RegistrationStatus } from './types'

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  active: 'На учёте',
  archived: 'Архив',
  temporary: 'Временный учёт',
  pending: 'На проверке',
}

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'Мужской',
  female: 'Женский',
}
