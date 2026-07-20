import type { EducationLevel, EmploymentStatus, RegistrationStatus } from './types'

export const REGIONS = [
  'Москва',
  'Санкт-Петербург',
  'Московская область',
  'Краснодарский край',
  'Свердловская область',
  'Новосибирская область',
  'Республика Татарстан',
  'Ростовская область',
  'Нижегородская область',
  'Самарская область',
]

export const LAST_NAMES_M = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Смирнов',
  'Кузнецов',
  'Попов',
  'Васильев',
  'Соколов',
  'Михайлов',
  'Новиков',
  'Федоров',
  'Морозов',
  'Волков',
  'Алексеев',
  'Лебедев',
]

export const LAST_NAMES_F = [
  'Иванова',
  'Петрова',
  'Сидорова',
  'Смирнова',
  'Кузнецова',
  'Попова',
  'Васильева',
  'Соколова',
  'Михайлова',
  'Новикова',
  'Федорова',
  'Морозова',
  'Волкова',
  'Алексеева',
  'Лебедева',
]

export const FIRST_NAMES_M = [
  'Александр',
  'Дмитрий',
  'Сергей',
  'Андрей',
  'Алексей',
  'Иван',
  'Максим',
  'Николай',
  'Павел',
  'Роман',
]

export const FIRST_NAMES_F = [
  'Анна',
  'Мария',
  'Елена',
  'Ольга',
  'Наталья',
  'Екатерина',
  'Ирина',
  'Татьяна',
  'Юлия',
  'Светлана',
]

export const MIDDLE_NAMES_M = [
  'Александрович',
  'Дмитриевич',
  'Сергеевич',
  'Иванович',
  'Петрович',
  'Алексеевич',
  'Николаевич',
]

export const MIDDLE_NAMES_F = [
  'Александровна',
  'Дмитриевна',
  'Сергеевна',
  'Ивановна',
  'Петровна',
  'Алексеевна',
  'Николаевна',
]

export const CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Подольск',
  'Краснодар',
  'Екатеринбург',
  'Новосибирск',
  'Казань',
  'Ростов-на-Дону',
  'Нижний Новгород',
  'Самара',
]

export const STREETS = [
  'ул. Ленина',
  'ул. Пушкина',
  'ул. Гагарина',
  'пр. Мира',
  'ул. Советская',
  'ул. Кирова',
  'ул. Садовая',
  'ул. Центральная',
]

export const SCHOOLS = [
  'МГУ',
  'СПбГУ',
  'МГТУ им. Баумана',
  'ВШЭ',
  'Политехнический колледж',
  'Педагогический университет',
  'Школа №15',
]

export const SPECIALTIES = ['Информатика', 'Экономика', 'Юриспруденция', 'Медицина']

export const JOBS = [
  { organization: 'ООО Ромашка', position: 'Менеджер' },
  { organization: 'АО Городские сети', position: 'Инженер' },
  { organization: 'ГУП Жилсервис', position: 'Специалист' },
  { organization: 'МБОУ СОШ №12', position: 'Учитель' },
  { organization: 'ООО ТехноСофт', position: 'Программист' },
  { organization: 'ПАО МеталлПром', position: 'Мастер' },
]

export const FAMILY_RELATIONS = ['spouse', 'child', 'parent', 'sibling', 'other'] as const

export const STATUSES: RegistrationStatus[] = ['active', 'archived', 'temporary', 'pending']

export const EMPLOYMENT_STATUSES: EmploymentStatus[] = [
  'employed',
  'unemployed',
  'retired',
  'student',
  'self_employed',
]

export const EDUCATION_LEVELS: EducationLevel[] = [
  'secondary',
  'vocational',
  'bachelor',
  'master',
  'other',
]

export const CITIZEN_COUNT = 1200
