import { CITIZEN_COUNT } from './dictionaries'
import { createCitizens } from './generate'
import type { Citizen, ListCitizensParams, ListCitizensResult } from './types'

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
  const start = (page - 1) * pageSize

  return {
    items: citizens.slice(start, start + pageSize),
    total: citizens.length,
    page,
    pageSize,
  }
}

export async function getCitizen(id: string): Promise<Citizen | null> {
  await delay()
  return citizens.find((citizen) => citizen.id === id) ?? null
}
