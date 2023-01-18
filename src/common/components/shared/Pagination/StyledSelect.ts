import NativeSelect from '@mui/material/NativeSelect'
import { NativeSelectProps } from '@mui/material/NativeSelect/NativeSelect'
import { styled } from '@mui/material/styles'

export const StyledSelect = styled(NativeSelect)<NativeSelectProps>(({ theme }) => ({
  fontFamily: 'Montserrat',
  fontWeight: 500,
  border: '1px solid #D9D9D9',
  borderRadius: '4px',
  padding: theme.spacing(0, 1),
  '&::before': {
    border: 'none',
    padding: theme.spacing(0, 1),
    content: '""',
  },
  '.MuiNativeSelect-select': {
    paddingRight: '20px !important',
    textAlign: 'center',
  },
  '.MuiNativeSelect-select.MuiInputBase-input.MuiInput-input': {
    backgroundColor: '#f9f9fa',
    '&::focus': {
      backgroundColor: '#f9f9fa',
    },
  },
}))
