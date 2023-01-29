import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { isRegisterTC } from '../../../features/auth/auth-slice'
import { selectIsRegistered } from '../../../features/auth/login-selectors'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import common from '../../styles/common.module.css'
import { CustomPaperContainer } from '../CustomPaperContainer/CustomPaperContainer'
import s from '../Login/Login.module.css'

type ValueType = {
  email: string
  password: string
  confirmPassword: string
}

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const isRegistered = useAppSelector(selectIsRegistered)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      dispatch(isRegisterTC({ email: values.email, password: values.password }))
    },
    validate: values => {
      const errors: Partial<ValueType> = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = `Invalid email`
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Invalid password'
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'passwords not match'
      }

      return errors
    },
  })

  if (isRegistered) {
    return <Navigate to={`/${PATH.LOGIN}`} />
  }

  return (
    <CustomPaperContainer>
      <FormControl fullWidth>
        <FormLabel>
          <h3 className={common.h3Label}>Sign up</h3>
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
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      sx={{ color: 'black' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...formik.getFieldProps('confirmPassword')}
              />
            </FormControl>
            <FormLabel className={s.formLabelForgotPassword}></FormLabel>
            <Button
              disabled={JSON.stringify(formik.errors) !== '{}'}
              style={{ marginTop: '50px' }}
              type={'submit'}
              variant={'contained'}
              fullWidth
              className={common.submitBtn}
            >
              Sign up
            </Button>
          </FormGroup>
        </form>
      </FormControl>
      <Box className={common.box}>
        <div>Already have an account?</div>
        <a href={'/friday-project#/login'} className={common.boxA}>
          Sign In
        </a>
      </Box>
    </CustomPaperContainer>
  )
}

// TODO: remove redundant isRegistered from store
