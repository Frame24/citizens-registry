import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { getCitizen, type Citizen } from '../../mock'
import { CitizenCardForm } from '../../components/citizen-card/CitizenCardForm'

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

      <CitizenCardForm key={citizen.id} initialCitizen={citizen} />
    </Box>
  )
}
