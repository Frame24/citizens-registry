import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  fullName,
  listCitizens,
  REGIONS,
  STATUS_LABELS,
  STATUSES,
  type Citizen,
  type RegistrationStatus,
} from '../../mock'

export function CitizensRegistryPage() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const [status, setStatus] = useState<RegistrationStatus | ''>('')

  const [items, setItems] = useState<Citizen[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState({ search: '', region: '', status: '' as RegistrationStatus | '' })

  useEffect(() => {
    setLoading(true)
    listCitizens({
      page: page + 1,
      pageSize,
      search: query.search || undefined,
      region: query.region || undefined,
      status: query.status || undefined,
    })
      .then((res) => {
        setItems(res.items)
        setTotal(res.total)
      })
      .finally(() => setLoading(false))
  }, [query, page, pageSize])

  const handleFind = () => {
    setPage(0)
    setQuery({ search, region, status })
  }

  const handleReset = () => {
    setSearch('')
    setRegion('')
    setStatus('')
    setPage(0)
    setQuery({ search: '', region: '', status: '' })
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Картотека граждан
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Всего записей: {total}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          size="small"
          label="ФИО"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleFind()
          }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Регион</InputLabel>
          <Select
            label="Регион"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value="">Все</MenuItem>
            {REGIONS.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            label="Статус"
            value={status}
            onChange={(e) => setStatus(e.target.value as RegistrationStatus | '')}
          >
            <MenuItem value="">Все</MenuItem>
            {STATUSES.map((s) => (
              <MenuItem key={s} value={s}>
                {STATUS_LABELS[s]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFind}>
          Найти
        </Button>
        <Button onClick={handleReset}>Сбросить</Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>Дата рождения</TableCell>
                <TableCell>Регион</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>Ничего не найдено</TableCell>
                </TableRow>
              )}
              {items.map((c) => (
                <TableRow
                  key={c.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/citizens/${c.id}`)}
                >
                  <TableCell>{fullName(c)}</TableCell>
                  <TableCell>{c.birthDate}</TableCell>
                  <TableCell>{c.registrationAddress.region}</TableCell>
                  <TableCell>{STATUS_LABELS[c.registrationStatus]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(e) => {
              setPageSize(Number(e.target.value))
              setPage(0)
            }}
            rowsPerPageOptions={[10, 20, 50]}
            labelRowsPerPage="На странице:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
          />
        </>
      )}
    </Box>
  )
}
