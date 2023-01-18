import { PaginationProps, styled } from '@mui/material'
import Pagination from '@mui/material/Pagination'

export const StyledPagination = styled(Pagination)<PaginationProps>(() => ({
  backgroundColor: '#FCFCFC',
  color: 'inherit',
  fontFamily: 'Montserrat',
  fontWeight: 500,
}))
