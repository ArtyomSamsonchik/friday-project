import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import { InferType } from 'yup'

import { PATH } from '../../../app/path'
import { loginTC } from '../../../features/auth/auth-slice'
import { selectIsLoggedIn } from '../../../features/auth/login-selectors'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useRedirectLocation } from '../../../utils/hooks/useRedirectLocation'
import { loginSchema } from '../../../utils/validationSchemas'
import common from '../../styles/common.module.css'
import { CustomPaperContainer } from '../CustomPaperContainer/CustomPaperContainer'

import s from './Login.module.css'

type FormValues = InferType<typeof loginSchema> & { rememberMe: boolean }

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { state: locationState } = useRedirectLocation()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={locationState?.path || `/${PATH.PACKS}`} replace />
  }

  return (
    <CustomPaperContainer>
      <FormControl fullWidth>
        <FormLabel>
          <h3 className={common.h3Label}>Sign in</h3>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup style={{ gap: '24px' }}>
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

            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      sx={{ color: 'black' }}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...formik.getFieldProps('password')}
              />
            </FormControl>

            {formik.errors.password && formik.touched.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
            <FormControlLabel
              label={'Remember me'}
              control={
                <Checkbox
                  {...formik.getFieldProps('rememberMe')}
                  checked={formik.values.rememberMe}
                />
              }
            />
            <FormLabel className={s.formLabelForgotPassword}>
              <p>
                <a href={'#/restore-password'} rel="Forgot Password? noreferrer">
                  {' '}
                  Forgot Password?
                </a>
              </p>
            </FormLabel>
            <Button type={'submit'} variant={'contained'} fullWidth className={common.submitBtn}>
              Sign in
            </Button>
          </FormGroup>
        </form>
      </FormControl>
      <Box className={common.box}>
        <p>Already have an account?</p>
        <a href={'#/signup'} className={common.boxA}>
          Sign up
        </a>
      </Box>
    </CustomPaperContainer>
  )
}
