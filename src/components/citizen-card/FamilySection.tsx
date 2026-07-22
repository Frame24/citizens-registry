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
  FAMILY_RELATION_LABELS,
  FAMILY_RELATIONS,
  type Citizen,
  type FamilyMember,
} from '../../mock'

interface Props {
  citizen: Citizen
  onChange: (citizen: Citizen) => void
}

export function FamilySection({ citizen, onChange }: Props) {
  const family = citizen.family

  const setFamily = (next: FamilyMember[]) => {
    onChange({ ...citizen, family: next })
  }

  const changeItem = (index: number, field: keyof FamilyMember, value: string | boolean) => {
    const next = family.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setFamily(next)
  }

  const add = () => {
    setFamily([
      ...family,
      {
        id: `${citizen.id}-fam-${Date.now()}`,
        fullName: '',
        relation: 'other',
        birthDate: '',
        livingTogether: true,
      },
    ])
  }

  return (
    <Box>
      {family.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Родственники не указаны
        </Typography>
      )}

      <Stack spacing={2}>
        {family.map((item, index) => (
          <Box key={item.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2">Родственник {index + 1}</Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => setFamily(family.filter((_, i) => i !== index))}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="ФИО"
                value={item.fullName}
                onChange={(e) => changeItem(index, 'fullName', e.target.value)}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Степень родства</InputLabel>
                  <Select
                    label="Степень родства"
                    value={item.relation}
                    onChange={(e) => changeItem(index, 'relation', e.target.value)}
                  >
                    {FAMILY_RELATIONS.map((relation) => (
                      <MenuItem key={relation} value={relation}>
                        {FAMILY_RELATION_LABELS[relation]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Дата рождения"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={item.birthDate}
                  onChange={(e) => changeItem(index, 'birthDate', e.target.value)}
                />
              </Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.livingTogether}
                    onChange={(e) => changeItem(index, 'livingTogether', e.target.checked)}
                  />
                }
                label="Проживает совместно"
              />
            </Stack>
          </Box>
        ))}
      </Stack>

      <Button sx={{ mt: 2 }} startIcon={<AddIcon />} onClick={add}>
        Добавить родственника
      </Button>
    </Box>
  )
}
