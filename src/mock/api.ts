import { CITIZEN_COUNT } from './dictionaries'
import { createCitizens } from './generate'
import { STATUS_LABELS } from './labels'
import type {
  Citizen,
  DashboardStats,
  ListCitizensParams,
  ListCitizensResult,
  RegistrationStatus,
} from './types'

const citizens = createCitizens(CITIZEN_COUNT)

function delay(ms = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function fullName(
  citizen: Pick<Citizen, 'lastName' | 'firstName' | 'middleName'>,
): string {
  return [citizen.lastName, citizen.firstName, citizen.middleName]
    .filter(Boolean)
    .join(' ')
}

export async function listCitizens(
  params: ListCitizensParams = {},
): Promise<ListCitizensResult> {
  await delay()

  const page = params.page && params.page > 0 ? params.page : 1
  const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20

  let filtered = citizens

  if (params.search?.trim()) {
    const q = params.search.trim().toLowerCase()
    filtered = filtered.filter((c) => fullName(c).toLowerCase().includes(q))
  }
  if (params.region) {
    filtered = filtered.filter((c) => c.registrationAddress.region === params.region)
  }
  if (params.status) {
    filtered = filtered.filter((c) => c.registrationStatus === params.status)
  }

  const start = (page - 1) * pageSize

  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  }
}

function cloneCitizen(citizen: Citizen): Citizen {
  return JSON.parse(JSON.stringify(citizen)) as Citizen
}

export async function getCitizen(id: string): Promise<Citizen | null> {
  await delay()
  const found = citizens.find((c) => c.id === id)
  return found ? cloneCitizen(found) : null
}

export async function updateCitizen(citizen: Citizen): Promise<Citizen | null> {
  await delay(150)
  const index = citizens.findIndex((c) => c.id === citizen.id)
  if (index === -1) return null
  citizens[index] = cloneCitizen(citizen)
  return cloneCitizen(citizens[index])
}

function getAge(birthDate: string): number {
  const now = new Date()
  const birth = new Date(birthDate)
  let age = now.getFullYear() - birth.getFullYear()
  if (
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
  ) {
    age--
  }
  return age
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay()

  let active = 0
  let pending = 0
  let archived = 0

  const ageGroups = {
    '0-17': 0,
    '18-29': 0,
    '30-44': 0,
    '45-59': 0,
    '60+': 0,
  }

  const regions: Record<string, number> = {}
  const statusList: RegistrationStatus[] = ['active', 'archived', 'temporary', 'pending']
  const statuses: Record<RegistrationStatus, number> = {
    active: 0,
    archived: 0,
    temporary: 0,
    pending: 0,
  }

  for (const c of citizens) {
    statuses[c.registrationStatus]++

    if (c.registrationStatus === 'active') active++
    else if (c.registrationStatus === 'pending') pending++
    else if (c.registrationStatus === 'archived') archived++

    const age = getAge(c.birthDate)
    if (age < 18) ageGroups['0-17']++
    else if (age < 30) ageGroups['18-29']++
    else if (age < 45) ageGroups['30-44']++
    else if (age < 60) ageGroups['45-59']++
    else ageGroups['60+']++

    const region = c.registrationAddress.region
    regions[region] = (regions[region] || 0) + 1
  }

  return {
    total: citizens.length,
    active,
    pending,
    archived,
    byAge: Object.entries(ageGroups).map(([name, value]) => ({ name, value })),
    byRegion: Object.entries(regions)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value),
    byStatus: statusList.map((key) => ({
      name: STATUS_LABELS[key],
      value: statuses[key],
    })),
  }
}
