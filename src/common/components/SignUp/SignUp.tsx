import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { isRegisterTC, selectIsRegistered } from '../../../features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { Title } from '../Title/Title'

import style from './registerForm.module.css'

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
      console.log(values)
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
      console.log(errors)

      return errors
    },
  })

  if (isRegistered) {
    return <Navigate to={`/${PATH.LOGIN}`} />
  }

  return (
    <div className={style.container}>
      <form className={style.registerForm} onSubmit={formik.handleSubmit}>
        <Title title={'SIGN UP'} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="email">email</InputLabel>
            <Input id="email" {...formik.getFieldProps('email')} type="text" />
          </FormControl>
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              {...formik.getFieldProps('password')}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="confirm password">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              {...formik.getFieldProps('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </Box>

        <div className={style.ButtonAndLink}>
          <button disabled={JSON.stringify(formik.errors) !== '{}'} type="submit">
            Submit
          </button>
          <div>Already have an account?</div>
          <a href={'/friday-project#/login'} style={{ color: 'blue' }}>
            {' '}
            Sign In
          </a>
        </div>
      </form>
    </div>
  )
}
