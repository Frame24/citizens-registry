import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  DOCUMENT_TYPE_LABELS,
  type Citizen,
  type CitizenDocument,
  type DocumentType,
} from '../../mock'

const DOC_TYPES: DocumentType[] = ['passport', 'snils', 'inn', 'other']

interface Props {
  citizen: Citizen
  onChange: (citizen: Citizen) => void
}

export function DocumentsSection({ citizen, onChange }: Props) {
  const docs = citizen.documents

  const setDocs = (documents: CitizenDocument[]) => {
    onChange({ ...citizen, documents })
  }

  return (
    <Box>
      {docs.map((doc, index) => (
        <Stack
          key={doc.id}
          spacing={1.5}
          sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">
              {DOCUMENT_TYPE_LABELS[doc.type]}
            </Typography>
            <IconButton
              size="small"
              color="error"
              onClick={() => setDocs(docs.filter((_, i) => i !== index))}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>

          <FormControl size="small" fullWidth>
            <InputLabel>Тип документа</InputLabel>
            <Select
              label="Тип документа"
              value={doc.type}
              onChange={(e) => {
                const next = [...docs]
                next[index] = { ...doc, type: e.target.value as DocumentType }
                setDocs(next)
              }}
            >
              {DOC_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {DOCUMENT_TYPE_LABELS[type]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              size="small"
              label="Серия"
              value={doc.series ?? ''}
              onChange={(e) => {
                const next = [...docs]
                next[index] = { ...doc, series: e.target.value || undefined }
                setDocs(next)
              }}
            />
            <TextField
              size="small"
              fullWidth
              required
              label="Номер"
              value={doc.number}
              onChange={(e) => {
                const next = [...docs]
                next[index] = { ...doc, number: e.target.value }
                setDocs(next)
              }}
            />
          </Stack>

          <TextField
            size="small"
            label="Кем выдан"
            value={doc.issuedBy ?? ''}
            onChange={(e) => {
              const next = [...docs]
              next[index] = { ...doc, issuedBy: e.target.value || undefined }
              setDocs(next)
            }}
          />
          <TextField
            size="small"
            type="date"
            label="Дата выдачи"
            slotProps={{ inputLabel: { shrink: true } }}
            value={doc.issuedAt ?? ''}
            onChange={(e) => {
              const next = [...docs]
              next[index] = { ...doc, issuedAt: e.target.value || undefined }
              setDocs(next)
            }}
          />
        </Stack>
      ))}

      {docs.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Документы не указаны
        </Typography>
      )}

      <Button
        startIcon={<AddIcon />}
        onClick={() =>
          setDocs([
            ...docs,
            {
              id: `${citizen.id}-doc-${Date.now()}`,
              type: 'other',
              number: '',
            },
          ])
        }
      >
        Добавить документ
      </Button>

      <TextField
        sx={{ mt: 3 }}
        fullWidth
        multiline
        minRows={3}
        label="Примечания"
        value={citizen.notes ?? ''}
        onChange={(e) => onChange({ ...citizen, notes: e.target.value || undefined })}
      />
    </Box>
  )
}
