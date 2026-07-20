export type Gender = 'male' | 'female'

export type RegistrationStatus = 'active' | 'archived' | 'temporary' | 'pending'

export type EducationLevel =
  | 'secondary'
  | 'vocational'
  | 'bachelor'
  | 'master'
  | 'other'

export type EmploymentStatus =
  | 'employed'
  | 'unemployed'
  | 'retired'
  | 'student'
  | 'self_employed'

export type FamilyRelation = 'spouse' | 'child' | 'parent' | 'sibling' | 'other'

export type DocumentType = 'passport' | 'snils' | 'inn' | 'other'

export interface Address {
  region: string
  city: string
  street: string
  house: string
  apartment?: string
}

export interface FamilyMember {
  id: string
  fullName: string
  relation: FamilyRelation
  birthDate: string
  livingTogether: boolean
}

export interface EducationRecord {
  id: string
  level: EducationLevel
  institution: string
  specialty?: string
  startYear: number
  endYear?: number
  completed: boolean
}

export interface WorkRecord {
  id: string
  organization: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
}

export interface CitizenDocument {
  id: string
  type: DocumentType
  series?: string
  number: string
  issuedBy?: string
  issuedAt?: string
}

export interface Citizen {
  id: string
  lastName: string
  firstName: string
  middleName?: string
  birthDate: string
  gender: Gender
  snils?: string
  inn?: string
  phone?: string
  email?: string
  registrationAddress: Address
  actualAddress?: Address
  registrationStatus: RegistrationStatus
  registeredAt: string
  notes?: string
  family: FamilyMember[]
  education: EducationRecord[]
  employmentStatus: EmploymentStatus
  workHistory: WorkRecord[]
  documents: CitizenDocument[]
}

export interface ListCitizensParams {
  page?: number
  pageSize?: number
}

export interface ListCitizensResult {
  items: Citizen[]
  total: number
  page: number
  pageSize: number
}
