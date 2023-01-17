import React, { SyntheticEvent, forwardRef } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'

import { selectAppError, setAppError } from '../../../app/app-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(setAppError(null))
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
