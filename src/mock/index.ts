export { getCitizen, listCitizens, fullName, updateCitizen } from './api'
export {
  EDUCATION_LEVELS,
  EMPLOYMENT_STATUSES,
  FAMILY_RELATIONS,
  REGIONS,
  STATUSES,
} from './dictionaries'
export {
  DOCUMENT_TYPE_LABELS,
  EDUCATION_LEVEL_LABELS,
  EMPLOYMENT_STATUS_LABELS,
  FAMILY_RELATION_LABELS,
  GENDER_LABELS,
  STATUS_LABELS,
} from './labels'
export type {
  Address,
  Citizen,
  CitizenDocument,
  DocumentType,
  EducationLevel,
  EducationRecord,
  EmploymentStatus,
  FamilyMember,
  FamilyRelation,
  Gender,
  ListCitizensParams,
  ListCitizensResult,
  RegistrationStatus,
  WorkRecord,
} from './types'
