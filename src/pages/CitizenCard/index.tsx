import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export function CitizenCardPage() {
  const { id } = useParams()

  return <Typography>Карточка гражданина #{id}</Typography>
}
