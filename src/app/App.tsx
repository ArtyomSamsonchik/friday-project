import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '../common/components/Header/Header'
import { authTC } from '../features/auth/auth-slice'
import { useAppDispatch } from '../utils/hooks/useAppDispatch'
import { useAppSelector } from '../utils/hooks/useAppSelector'

import { selectAppStatus } from './app-slice'
import s from './App.module.css'

export const App = () => {
  const appStatus = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authTC())
  }, [])

  if (appStatus === 'init loading') {
    return (
      <CircularProgress
        size={70}
        thickness={5}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
          color: '#366EFF',
        }}
      />
    )
  }

  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <Header />
      <Outlet />
    </div>
  )
}
