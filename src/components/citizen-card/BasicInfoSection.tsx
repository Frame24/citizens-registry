import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import {
  GENDER_LABELS,
  REGIONS,
  STATUS_LABELS,
  STATUSES,
  type Address,
  type Citizen,
} from '../../mock'

interface Props {
  citizen: Citizen
  onChange: (citizen: Citizen) => void
}

function AddressBlock({
  title,
  value,
  onChange,
}: {
  title: string
  value: Address
  onChange: (next: Address) => void
}) {
  return (
    <>
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Регион</InputLabel>
            <Select
              label="Регион"
              value={value.region}
              onChange={(e) => onChange({ ...value, region: e.target.value })}
            >
              {REGIONS.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Город"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Улица"
            value={value.street}
            onChange={(e) => onChange({ ...value, street: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Дом"
            value={value.house}
            onChange={(e) => onChange({ ...value, house: e.target.value })}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Квартира"
            value={value.apartment ?? ''}
            onChange={(e) =>
              onChange({ ...value, apartment: e.target.value || undefined })
            }
          />
        </Grid>
      </Grid>
    </>
  )
}

export function BasicInfoSection({ citizen, onChange }: Props) {
  const sameAsRegistration = !citizen.actualAddress

  const setField = <K extends keyof Citizen>(key: K, value: Citizen[K]) => {
    onChange({ ...citizen, [key]: value })
  }

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          required
          label="Фамилия"
          value={citizen.lastName}
          onChange={(e) => setField('lastName', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          required
          label="Имя"
          value={citizen.firstName}
          onChange={(e) => setField('firstName', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="Отчество"
          value={citizen.middleName ?? ''}
          onChange={(e) => setField('middleName', e.target.value || undefined)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          type="date"
          label="Дата рождения"
          slotProps={{ inputLabel: { shrink: true } }}
          value={citizen.birthDate}
          onChange={(e) => setField('birthDate', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Пол</InputLabel>
          <Select
            label="Пол"
            value={citizen.gender}
            onChange={(e) => setField('gender', e.target.value as Citizen['gender'])}
          >
            <MenuItem value="male">{GENDER_LABELS.male}</MenuItem>
            <MenuItem value="female">{GENDER_LABELS.female}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Статус учёта</InputLabel>
          <Select
            label="Статус учёта"
            value={citizen.registrationStatus}
            onChange={(e) =>
              setField('registrationStatus', e.target.value as Citizen['registrationStatus'])
            }
          >
            {STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          type="date"
          label="Дата постановки на учёт"
          slotProps={{ inputLabel: { shrink: true } }}
          value={citizen.registeredAt}
          onChange={(e) => setField('registeredAt', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="Телефон"
          value={citizen.phone ?? ''}
          onChange={(e) => setField('phone', e.target.value || undefined)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          fullWidth
          size="small"
          label="Email"
          value={citizen.email ?? ''}
          onChange={(e) => setField('email', e.target.value || undefined)}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          size="small"
          label="СНИЛС"
          value={citizen.snils ?? ''}
          onChange={(e) => setField('snils', e.target.value || undefined)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          size="small"
          label="ИНН"
          value={citizen.inn ?? ''}
          onChange={(e) => setField('inn', e.target.value || undefined)}
        />
      </Grid>

      <Grid size={12}>
        <AddressBlock
          title="Адрес регистрации"
          value={citizen.registrationAddress}
          onChange={(registrationAddress) => setField('registrationAddress', registrationAddress)}
        />
      </Grid>

      <Grid size={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sameAsRegistration}
              onChange={(e) => {
                if (e.target.checked) {
                  setField('actualAddress', undefined)
                } else {
                  setField('actualAddress', { ...citizen.registrationAddress })
                }
              }}
            />
          }
          label="Адрес проживания совпадает с регистрацией"
        />
        {!sameAsRegistration && citizen.actualAddress && (
          <AddressBlock
            title="Адрес проживания"
            value={citizen.actualAddress}
            onChange={(actualAddress) => setField('actualAddress', actualAddress)}
          />
        )}
      </Grid>
    </Grid>
  )
}
