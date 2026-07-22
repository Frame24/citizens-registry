import { useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import { fullName, STATUS_LABELS, updateCitizen, type Citizen } from '../../mock'
import { BasicInfoSection } from './BasicInfoSection'
import { DocumentsSection } from './DocumentsSection'
import { EducationSection } from './EducationSection'
import { FamilySection } from './FamilySection'
import { WorkSection } from './WorkSection'

interface Props {
  initialCitizen: Citizen
}

function initials(citizen: Citizen): string {
  const first = citizen.firstName.trim().charAt(0)
  const last = citizen.lastName.trim().charAt(0)
  return `${last}${first}`.toUpperCase() || '?'
}

export function CitizenCardForm({ initialCitizen }: Props) {
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState(initialCitizen)
  const [saved, setSaved] = useState(initialCitizen)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [toastError, setToastError] = useState(false)

  const hasChanges = JSON.stringify(form) !== JSON.stringify(saved)

  const save = async () => {
    if (!form.lastName.trim() || !form.firstName.trim()) {
      setToastError(true)
      setToast('Укажите фамилию и имя')
      setTab(0)
      return
    }

    setSaving(true)
    try {
      const updated = await updateCitizen(form)
      if (!updated) {
        setToastError(true)
        setToast('Не удалось сохранить')
        return
      }
      setForm(updated)
      setSaved(updated)
      setToastError(false)
      setToast('Сохранено')
    } catch {
      setToastError(true)
      setToast('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 2.5 },
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ minWidth: 0, flex: 1, alignItems: 'flex-start' }}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: 'primary.main',
              fontSize: 24,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {initials(form)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5" sx={{ wordBreak: 'break-word' }}>
              {fullName(form)}
            </Typography>
            <Chip
              size="small"
              color="secondary"
              variant="outlined"
              label={STATUS_LABELS[form.registrationStatus]}
              sx={{ mt: 1, mb: 1.25 }}
            />
            <Stack spacing={0.75}>
              {form.phone && (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {form.phone}
                  </Typography>
                </Stack>
              )}
              {form.email && (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {form.email}
                  </Typography>
                </Stack>
              )}
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <PlaceOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {form.registrationAddress.region}, {form.registrationAddress.city}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          {hasChanges && (
            <Button disabled={saving} onClick={() => setForm(saved)}>
              Отменить
            </Button>
          )}
          <Button variant="contained" disabled={saving || !hasChanges} onClick={save}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Box>
      </Paper>

      <Paper variant="outlined">
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 1,
            minHeight: 48,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab label="Основные сведения" />
          <Tab label="Семья" />
          <Tab label="Образование" />
          <Tab label="Труд и соцстатус" />
          <Tab label="Документы" />
        </Tabs>

        <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
          {tab === 0 && <BasicInfoSection citizen={form} onChange={setForm} />}
          {tab === 1 && <FamilySection citizen={form} onChange={setForm} />}
          {tab === 2 && <EducationSection citizen={form} onChange={setForm} />}
          {tab === 3 && <WorkSection citizen={form} onChange={setForm} />}
          {tab === 4 && <DocumentsSection citizen={form} onChange={setForm} />}
        </Box>
      </Paper>

      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toastError ? 'error' : 'success'} onClose={() => setToast(null)}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  )
}
