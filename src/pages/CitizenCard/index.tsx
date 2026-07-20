import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link as RouterLink, useParams } from 'react-router-dom'
import {
  fullName,
  GENDER_LABELS,
  getCitizen,
  STATUS_LABELS,
  type Citizen,
} from '../../mock'

export function CitizenCardPage() {
  const { id } = useParams()
  const [citizen, setCitizen] = useState<Citizen | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    let cancelled = false
    setLoading(true)
    setError(null)

    getCitizen(id)
      .then((result) => {
        if (cancelled) return
        if (!result) {
          setError('Гражданин не найден')
          setCitizen(null)
          return
        }
        setCitizen(result)
      })
      .catch(() => {
        if (!cancelled) setError('Не удалось загрузить карточку')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={32} />
      </Box>
    )
  }

  if (error || !citizen) {
    return (
      <Box>
        <Button
          component={RouterLink}
          to="/citizens"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Назад к картотеке
        </Button>
        <Typography color="error">{error ?? 'Нет данных'}</Typography>
      </Box>
    )
  }

  const address = citizen.registrationAddress

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/citizens"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Назад к картотеке
      </Button>

      <Typography variant="h5" sx={{ mb: 2 }}>
        {fullName(citizen)}
      </Typography>

      <Typography>Дата рождения: {citizen.birthDate}</Typography>
      <Typography>Пол: {GENDER_LABELS[citizen.gender]}</Typography>
      <Typography>Статус учёта: {STATUS_LABELS[citizen.registrationStatus]}</Typography>
      <Typography>
        Адрес: {address.region}, {address.city}, {address.street}, д. {address.house}
        {address.apartment ? `, кв. ${address.apartment}` : ''}
      </Typography>
      <Typography>Телефон: {citizen.phone ?? 'нет'}</Typography>
      <Typography>СНИЛС: {citizen.snils ?? 'нет'}</Typography>

      <Typography sx={{ mt: 2 }}>
        Семья: {citizen.family.length}, образование: {citizen.education.length}, работа:{' '}
        {citizen.workHistory.length}, документы: {citizen.documents.length}
      </Typography>
    </Box>
  )
}
