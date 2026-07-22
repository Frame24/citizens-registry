import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Chip,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { fullName, STATUS_LABELS, updateCitizen, type Citizen } from '../../mock'
import { BasicInfoSection } from './BasicInfoSection'
import { DocumentsSection } from './DocumentsSection'
import { EducationSection } from './EducationSection'
import { FamilySection } from './FamilySection'
import { WorkSection } from './WorkSection'

interface Props {
  initialCitizen: Citizen
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h5">{fullName(form)}</Typography>
          <Chip size="small" label={STATUS_LABELS[form.registrationStatus]} sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {hasChanges && (
            <Button disabled={saving} onClick={() => setForm(saved)}>
              Отменить
            </Button>
          )}
          <Button variant="contained" disabled={saving || !hasChanges} onClick={save}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}
        >
          <Tab label="Основные сведения" />
          <Tab label="Семья" />
          <Tab label="Образование" />
          <Tab label="Труд и соцстатус" />
          <Tab label="Документы" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {tab === 0 && <BasicInfoSection citizen={form} onChange={setForm} />}
          {tab === 1 && <FamilySection citizen={form} onChange={setForm} />}
          {tab === 2 && <EducationSection citizen={form} onChange={setForm} />}
          {tab === 3 && <WorkSection citizen={form} onChange={setForm} />}
          {tab === 4 && <DocumentsSection citizen={form} onChange={setForm} />}
        </Box>
      </Box>

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
