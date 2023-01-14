import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import DirectionSnackbar from '../common/components/ErrorSnackbar/ErrorSnackbar'
import CustomizedSnackbars from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '../common/components/Header/Header'
import { authTC } from '../features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

import { selectAppStatus } from './app-slice'
import s from './App.module.css'

export const App = () => {
  const appStatus = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authTC())
  }, [])

  if (appStatus === 'loading') {
    return <h1>Loading...</h1>
  }

  return (
    <div className={s.app}>
      <CustomizedSnackbars />
      <Header />
      <Outlet />
    </div>
  )
}
