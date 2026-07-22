import type {
  DocumentType,
  EducationLevel,
  EmploymentStatus,
  FamilyRelation,
  Gender,
  RegistrationStatus,
} from './types'

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

export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  secondary: 'Среднее',
  vocational: 'Среднее профессиональное',
  bachelor: 'Бакалавриат',
  master: 'Магистратура',
  other: 'Другое',
}

export const EMPLOYMENT_STATUS_LABELS: Record<EmploymentStatus, string> = {
  employed: 'Работает',
  unemployed: 'Безработный',
  retired: 'Пенсионер',
  student: 'Студент',
  self_employed: 'Самозанятый',
}

export const FAMILY_RELATION_LABELS: Record<FamilyRelation, string> = {
  spouse: 'Супруг(а)',
  child: 'Ребёнок',
  parent: 'Родитель',
  sibling: 'Брат / сестра',
  other: 'Другое',
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  passport: 'Паспорт',
  snils: 'СНИЛС',
  inn: 'ИНН',
  other: 'Другой документ',
}
