import React, { useEffect, useState } from 'react'

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
import { useNavigate, useParams } from 'react-router-dom'
import { InferType } from 'yup'

import { PATH } from '../../../app/path'
import { setNewPasswordTC, setNewPasswordToken } from '../../../features/auth/auth-slice'
import { selectIsStateToken } from '../../../features/auth/login-selectors'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { passwordSchema } from '../../../utils/validationSchemas'
import common from '../../styles/common.module.css'
import { CustomPaperContainer } from '../CustomPaperContainer/CustomPaperContainer'

type FormValues = { newPassword: InferType<typeof passwordSchema> }

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const isStateToken = useAppSelector(selectIsStateToken)

  const formik = useFormik<FormValues>({
    initialValues: {
      newPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: values => {
      token && dispatch(setNewPasswordTC(values.newPassword, token))
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
          <h3 className={common.h3Label}>Write new password</h3>
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
}
