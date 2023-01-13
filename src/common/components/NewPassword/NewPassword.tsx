import React, { useEffect } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, Input } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { setNewPasswordTC, setNewPasswordToken } from '../../../features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import common from '../../styles/common.module.css'
import { CustomPaperContainer } from '../CustomPaperContainer/CustomPaperContainer'
import { FormikErrorType } from '../RestorePassword/RestorePassword'

export const NewPassword = React.memo(() => {
  const [showPassword, setShowPassword] = React.useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const isStateToken = useAppSelector<string>(state => state.auth.isStateToken)

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Invalid password. Password length must be more then 7 '
      }

      return errors
    },
    onSubmit: values => {
      token && dispatch(setNewPasswordTC(values.password, token))
    },
  })

  useEffect(() => {
    if (!isStateToken || !token) {
      navigate(`/${PATH.LOGIN}`)
    }
    token && dispatch(setNewPasswordToken(token))
  }, [isStateToken])

  return (
    <CustomPaperContainer>
      <FormControl fullWidth>
        <FormLabel>
          <h3 className={common.h3Label}>Forgot your password?</h3>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ gap: '30px' }}>
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
            <FormLabel>
              <p style={{ margin: '0' }}>
                Create new password and we will send you <br /> further instructions to email
              </p>
            </FormLabel>
            <Button type={'submit'} variant={'contained'} fullWidth className={common.submitBtn}>
              Create new password
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </CustomPaperContainer>
  )
})
