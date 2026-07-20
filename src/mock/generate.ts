/**
 * Генерация mock данных.
 * По ТЗ предполагается возможность, что картотека содержит более 100 тысяч записей с большим набором параметров.
 */

import {
  CITIES,
  EDUCATION_LEVELS,
  EMPLOYMENT_STATUSES,
  FAMILY_RELATIONS,
  FIRST_NAMES_F,
  FIRST_NAMES_M,
  JOBS,
  LAST_NAMES_F,
  LAST_NAMES_M,
  MIDDLE_NAMES_F,
  MIDDLE_NAMES_M,
  REGIONS,
  SCHOOLS,
  SPECIALTIES,
  STATUSES,
  STREETS,
} from './dictionaries'
import type {
  Address,
  Citizen,
  CitizenDocument,
  EducationRecord,
  EmploymentStatus,
  FamilyMember,
  WorkRecord,
} from './types'

function atIndex<T>(items: readonly T[], index: number): T {
  return items[index % items.length]!
}

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

function dateFromYear(year: number, salt: number): string {
  const month = (salt % 12) + 1
  const day = (salt % 28) + 1
  return `${year}-${pad2(month)}-${pad2(day)}`
}

function createSnils(index: number): string {
  const a = String(100 + (index % 900)).padStart(3, '0')
  const b = String(index % 1000).padStart(3, '0')
  const c = String((index * 7) % 1000).padStart(3, '0')
  const d = String(index % 100).padStart(2, '0')
  return `${a}-${b}-${c} ${d}`
}

function createPhone(index: number): string {
  const code = String(10 + (index % 80)).padStart(2, '0')
  const part1 = String(100 + (index % 900)).padStart(3, '0')
  const part2 = String(10 + (index % 80)).padStart(2, '0')
  const part3 = String(10 + ((index * 3) % 80)).padStart(2, '0')
  return `+7 (9${code}) ${part1}-${part2}-${part3}`
}

function createAddress(index: number): Address {
  return {
    region: atIndex(REGIONS, index),
    city: atIndex(CITIES, index * 3),
    street: atIndex(STREETS, index * 5),
    house: String((index % 80) + 1),
    apartment: index % 4 === 0 ? undefined : String((index % 120) + 1),
  }
}

function createFamily(citizenId: string, index: number): FamilyMember[] {
  const count = index % 4
  const members: FamilyMember[] = []

  for (let n = 0; n < count; n++) {
    const isFemale = (index + n) % 2 === 0
    const lastName = atIndex(isFemale ? LAST_NAMES_F : LAST_NAMES_M, index + n)
    const firstName = atIndex(isFemale ? FIRST_NAMES_F : FIRST_NAMES_M, index + n * 2)

    members.push({
      id: `${citizenId}-fam-${n}`,
      fullName: `${lastName} ${firstName}`,
      relation: atIndex(FAMILY_RELATIONS, index + n),
      birthDate: dateFromYear(1960 + ((index + n) % 40), index + n),
      livingTogether: (index + n) % 3 !== 0,
    })
  }

  return members
}

function createEducation(
  citizenId: string,
  index: number,
  birthYear: number,
): EducationRecord[] {
  const count = 1 + (index % 3)
  const records: EducationRecord[] = []

  for (let n = 0; n < count; n++) {
    const level = atIndex(EDUCATION_LEVELS, index + n)
    const startYear = birthYear + 17 + n * 4
    const completed = n !== count - 1 || index % 5 !== 0

    records.push({
      id: `${citizenId}-edu-${n}`,
      level,
      institution: atIndex(SCHOOLS, index + n),
      specialty: level === 'secondary' ? undefined : atIndex(SPECIALTIES, index + n),
      startYear,
      endYear: completed ? startYear + 4 : undefined,
      completed,
    })
  }

  return records
}

function createWorkHistory(
  citizenId: string,
  index: number,
  status: EmploymentStatus,
): WorkRecord[] {
  if (status === 'student' && index % 3 === 0) {
    return []
  }

  const count = status === 'unemployed' ? index % 2 : 1 + (index % 3)
  const records: WorkRecord[] = []
  let year = 2005 + (index % 10)

  for (let n = 0; n < count; n++) {
    const job = atIndex(JOBS, index + n)
    const isCurrent =
      n === count - 1 && (status === 'employed' || status === 'self_employed')

    records.push({
      id: `${citizenId}-work-${n}`,
      organization: job.organization,
      position: job.position,
      startDate: dateFromYear(year, index + n),
      endDate: isCurrent ? undefined : dateFromYear(year + 2 + (n % 3), index + n),
      isCurrent,
    })

    year += 3
  }

  return records
}

function createDocuments(
  citizenId: string,
  index: number,
  snils: string,
  inn?: string,
): CitizenDocument[] {
  const docs: CitizenDocument[] = [
    {
      id: `${citizenId}-passport`,
      type: 'passport',
      series: String(4500 + (index % 50)),
      number: String(100000 + (index % 900000)),
      issuedBy: 'ОВД',
      issuedAt: dateFromYear(2010 + (index % 14), index),
    },
    {
      id: `${citizenId}-snils`,
      type: 'snils',
      number: snils,
    },
  ]

  if (inn) {
    docs.push({
      id: `${citizenId}-inn`,
      type: 'inn',
      number: inn,
      issuedBy: 'ФНС',
    })
  }

  return docs
}

export function createCitizen(index: number): Citizen {
  const id = String(index + 1)
  const isFemale = index % 2 === 0
  const birthYear = 1950 + (index % 55)
  const snils = createSnils(index)
  const inn = index % 5 === 0 ? undefined : String(100000000000 + index).slice(0, 12)
  const employmentStatus = atIndex(EMPLOYMENT_STATUSES, index * 7)

  return {
    id,
    lastName: atIndex(isFemale ? LAST_NAMES_F : LAST_NAMES_M, index),
    firstName: atIndex(isFemale ? FIRST_NAMES_F : FIRST_NAMES_M, index * 2),
    middleName: atIndex(isFemale ? MIDDLE_NAMES_F : MIDDLE_NAMES_M, index * 3),
    birthDate: dateFromYear(birthYear, index),
    gender: isFemale ? 'female' : 'male',
    snils,
    inn,
    phone: createPhone(index),
    email: index % 4 === 0 ? undefined : `user${index}@mail.ru`,
    registrationAddress: createAddress(index),
    actualAddress: index % 3 === 0 ? createAddress(index + 11) : undefined,
    registrationStatus: atIndex(STATUSES, index),
    registeredAt: dateFromYear(2016 + (index % 9), index),
    notes: index % 7 === 0 ? 'Нужно уточнить адрес' : undefined,
    family: createFamily(id, index),
    education: createEducation(id, index, birthYear),
    employmentStatus,
    workHistory: createWorkHistory(id, index, employmentStatus),
    documents: createDocuments(id, index, snils, inn),
  }
}

export function createCitizens(count: number): Citizen[] {
  const list: Citizen[] = []
  for (let i = 0; i < count; i++) {
    list.push(createCitizen(i))
  }
  return list
}
