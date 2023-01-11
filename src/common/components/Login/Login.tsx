import React from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { LoginTC } from '../../../features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const Login = React.memo(() => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Invalid password'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(LoginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <Paper
          variant={'outlined'}
          style={{ padding: '33px', marginTop: '60px', minWidth: '420px' }}
        >
          <FormControl fullWidth>
            <FormLabel>
              <h3
                style={{ color: '#000', fontSize: '26px', fontWeight: '600', textAlign: 'center' }}
              >
                Sign in
              </h3>
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
                <FormLabel style={{ textAlign: 'right', color: '#000', marginBottom: '69px' }}>
                  <p>
                    <a href={'#/restore-password'} rel="Forgot Password? noreferrer">
                      {' '}
                      Forgot Password?
                    </a>
                  </p>
                </FormLabel>
                <Button
                  type={'submit'}
                  variant={'contained'}
                  fullWidth
                  style={{
                    backgroundColor: '#366EFF',
                    borderRadius: '30px',
                    textTransform: 'initial',
                  }}
                >
                  Sign in
                </Button>
              </FormGroup>
            </form>
          </FormControl>
          <Box style={{ textAlign: 'center', marginTop: '31px' }}>
            <p>Already have an account?</p>
            <a
              href={'#/signup'}
              style={{
                fontSize: '16px',
                textDecoration: 'underline',
                color: '#366EFF',
                fontWeight: '600',
              }}
            >
              Sign up
            </a>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
})
