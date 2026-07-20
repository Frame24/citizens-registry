import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { fullName, listCitizens, STATUS_LABELS, type Citizen } from '../../mock'

const PAGE_SIZE_OPTIONS = [10, 20, 50]

export function CitizensRegistryPage() {
  const [items, setItems] = useState<Citizen[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    listCitizens({ page: page + 1, pageSize })
      .then((result) => {
        if (cancelled) return
        setItems(result.items)
        setTotal(result.total)
      })
      .catch(() => {
        if (!cancelled) setError('Не удалось загрузить список')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [page, pageSize])

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Картотека граждан
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Всего записей: {total}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress size={32} />
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
              {items.map((citizen) => (
                <TableRow key={citizen.id} hover>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`/citizens/${citizen.id}`}
                      underline="hover"
                    >
                      {fullName(citizen)}
                    </Link>
                  </TableCell>
                  <TableCell>{citizen.birthDate}</TableCell>
                  <TableCell>{citizen.registrationAddress.region}</TableCell>
                  <TableCell>{STATUS_LABELS[citizen.registrationStatus]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, nextPage) => setPage(nextPage)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(event) => {
              setPageSize(Number(event.target.value))
              setPage(0)
            }}
            rowsPerPageOptions={PAGE_SIZE_OPTIONS}
            labelRowsPerPage="На странице:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
          />
        </>
      )}
    </Box>
  )
}
