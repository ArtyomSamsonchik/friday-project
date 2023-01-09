import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'

import { isRegisterTC } from '../../../features/auth/auth-slice'
import { useAppDispatch } from '../../../utils/hooks'
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

  const inputType = () => {
    return showPassword ? 'text' : 'password'
  }
  const isVisibility = () => {
    return showPassword ? <VisibilityOff /> : <Visibility />
  }
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
      } else if (values.password.length < 3) {
        errors.password = 'Invalid password'
      }

      console.log(errors)

      return errors
    },
  })

  return (
    <div className={style.container}>
      <form className={style.registerForm} onSubmit={formik.handleSubmit}>
        <Title title={'SIGN UP'} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <Input
                id={'email'}
                type={'text'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onMouseDown={handleMouseDownPassword}
                    ></IconButton>
                  </InputAdornment>
                }
              />
              <Input
                id={'password'}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />{' '}
              <div>
                <InputLabel htmlFor="confirmPassword">confirm Password</InputLabel>
                <Input
                  id={'confirmPassword'}
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
              </div>
            </FormControl>
          </div>
        </Box>

        <div className={style.ButtonAndLink}>
          <button type="submit">Submit</button>
          <div>Already have an account?</div>
          <a href={'/friday-project#/login'}> Sign In</a>
        </div>
      </form>
    </div>
  )
}
