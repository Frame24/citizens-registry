import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import {
  EDUCATION_LEVEL_LABELS,
  EDUCATION_LEVELS,
  type Citizen,
  type EducationRecord,
} from '../../mock'

interface Props {
  citizen: Citizen
  onChange: (citizen: Citizen) => void
}

export function EducationSection({ citizen, onChange }: Props) {
  const list = citizen.education

  const update = (next: EducationRecord[]) => {
    onChange({ ...citizen, education: next })
  }

  const add = () => {
    update([
      ...list,
      {
        id: `${citizen.id}-edu-${Date.now()}`,
        level: 'secondary',
        institution: '',
        startYear: new Date().getFullYear() - 4,
        completed: false,
      },
    ])
  }

  if (list.length === 0) {
    return (
      <Box>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Записи об образовании отсутствуют
        </Typography>
        <Button startIcon={<AddIcon />} onClick={add}>
          Добавить запись
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      {list.map((row, index) => (
        <Box
          key={row.id}
          sx={{
            mb: 2,
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="subtitle2">Запись {index + 1}</Typography>
            <IconButton
              size="small"
              onClick={() => update(list.filter((_, i) => i !== index))}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Уровень</InputLabel>
                <Select
                  label="Уровень"
                  value={row.level}
                  onChange={(e) => {
                    const next = [...list]
                    next[index] = {
                      ...row,
                      level: e.target.value as EducationRecord['level'],
                    }
                    update(next)
                  }}
                >
                  {EDUCATION_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {EDUCATION_LEVEL_LABELS[level]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Учебное заведение"
                value={row.institution}
                onChange={(e) => {
                  const next = [...list]
                  next[index] = { ...row, institution: e.target.value }
                  update(next)
                }}
              />
            </Grid>
            {row.level !== 'secondary' && (
              <Grid size={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Специальность"
                  value={row.specialty ?? ''}
                  onChange={(e) => {
                    const next = [...list]
                    next[index] = { ...row, specialty: e.target.value || undefined }
                    update(next)
                  }}
                />
              </Grid>
            )}
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Год начала"
                value={row.startYear}
                onChange={(e) => {
                  const next = [...list]
                  next[index] = { ...row, startYear: Number(e.target.value) }
                  update(next)
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Год окончания"
                disabled={!row.completed}
                value={row.endYear ?? ''}
                onChange={(e) => {
                  const next = [...list]
                  next[index] = {
                    ...row,
                    endYear: e.target.value ? Number(e.target.value) : undefined,
                  }
                  update(next)
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={row.completed}
                    onChange={(e) => {
                      const next = [...list]
                      next[index] = {
                        ...row,
                        completed: e.target.checked,
                        endYear: e.target.checked ? row.endYear : undefined,
                      }
                      update(next)
                    }}
                  />
                }
                label="Завершено"
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={add}>
        Добавить запись
      </Button>
    </Box>
  )
}
