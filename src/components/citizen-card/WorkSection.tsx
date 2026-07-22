import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  EMPLOYMENT_STATUS_LABELS,
  EMPLOYMENT_STATUSES,
  type Citizen,
  type WorkRecord,
} from '../../mock'

interface Props {
  citizen: Citizen
  onChange: (citizen: Citizen) => void
}

export function WorkSection({ citizen, onChange }: Props) {
  const jobs = citizen.workHistory

  const setJobs = (workHistory: WorkRecord[]) => {
    onChange({ ...citizen, workHistory })
  }

  return (
    <Stack spacing={2}>
      <FormControl size="small" sx={{ maxWidth: 320 }}>
        <InputLabel>Социальный статус</InputLabel>
        <Select
          label="Социальный статус"
          value={citizen.employmentStatus}
          onChange={(e) =>
            onChange({
              ...citizen,
              employmentStatus: e.target.value as Citizen['employmentStatus'],
            })
          }
        >
          {EMPLOYMENT_STATUSES.map((status) => (
            <MenuItem key={status} value={status}>
              {EMPLOYMENT_STATUS_LABELS[status]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle2">Места работы</Typography>

      {jobs.length === 0 && (
        <Typography color="text.secondary">Пока нет записей</Typography>
      )}

      {jobs.map((job, index) => (
        <Box key={job.id} sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2, py: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              #{index + 1}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={() => setJobs(jobs.filter((_, i) => i !== index))}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <TextField
              size="small"
              label="Организация"
              value={job.organization}
              onChange={(e) => {
                const next = [...jobs]
                next[index] = { ...job, organization: e.target.value }
                setJobs(next)
              }}
            />
            <TextField
              size="small"
              label="Должность"
              value={job.position}
              onChange={(e) => {
                const next = [...jobs]
                next[index] = { ...job, position: e.target.value }
                setJobs(next)
              }}
            />
            <Stack direction="row" spacing={1.5}>
              <TextField
                size="small"
                fullWidth
                type="date"
                label="С"
                slotProps={{ inputLabel: { shrink: true } }}
                value={job.startDate}
                onChange={(e) => {
                  const next = [...jobs]
                  next[index] = { ...job, startDate: e.target.value }
                  setJobs(next)
                }}
              />
              <TextField
                size="small"
                fullWidth
                type="date"
                label="По"
                slotProps={{ inputLabel: { shrink: true } }}
                disabled={job.isCurrent}
                value={job.endDate ?? ''}
                onChange={(e) => {
                  const next = [...jobs]
                  next[index] = { ...job, endDate: e.target.value || undefined }
                  setJobs(next)
                }}
              />
            </Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={job.isCurrent}
                  onChange={(e) => {
                    const next = [...jobs]
                    next[index] = {
                      ...job,
                      isCurrent: e.target.checked,
                      endDate: e.target.checked ? undefined : job.endDate,
                    }
                    setJobs(next)
                  }}
                />
              }
              label="Работает сейчас"
            />
          </Stack>
        </Box>
      ))}

      <Button
        startIcon={<AddIcon />}
        onClick={() =>
          setJobs([
            ...jobs,
            {
              id: `${citizen.id}-work-${Date.now()}`,
              organization: '',
              position: '',
              startDate: '',
              isCurrent: true,
            },
          ])
        }
      >
        Добавить место работы
      </Button>
    </Stack>
  )
}
