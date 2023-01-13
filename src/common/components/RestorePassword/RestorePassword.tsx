import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { recallPasswordTC } from '../../../features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import common from '../../styles/common.module.css'
import { CustomPaperContainer } from '../CustomPaperContainer/CustomPaperContainer'

export type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const RestorePassword = React.memo(() => {
  const dispatch = useAppDispatch()
  const isRecalled = useAppSelector<boolean>(state => state.auth.isRecalled)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(recallPasswordTC(values.email))
    },
  })

  if (isRecalled) {
    return <Navigate to={`/${PATH.CHECK_EMAIL}`} />
  }

  return (
    <CustomPaperContainer>
      <FormControl fullWidth>
        <FormLabel>
          <h3 className={common.h3Label}>Forgot your password?</h3>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              type="email"
              variant="standard"
              {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email && (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
            <FormLabel>
              <p>
                Enter your email address and we will send you <br />
                further instructions
              </p>
            </FormLabel>
            <Button type={'submit'} variant={'contained'} fullWidth className={common.submitBtn}>
              Send Instructions
            </Button>
          </FormGroup>
        </form>
      </FormControl>
      <Box className={common.box}>
        <p>Did you remember your password?</p>
        <a href={'#/signup'} className={common.boxA}>
          Try logging in
        </a>
      </Box>
    </CustomPaperContainer>
  )
})
