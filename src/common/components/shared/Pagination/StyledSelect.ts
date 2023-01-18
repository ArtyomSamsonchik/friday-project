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

/*
* border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    left: 0;
    bottom: 0;
    content: "\00a0";
    position: absolute;
    right: 0;
    -webkit-transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    pointer-events: none;
}
* */
