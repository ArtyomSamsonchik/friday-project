import React from 'react'

import { Outlet } from 'react-router-dom'

import { Header } from '../common/components/Header/Header'

import s from './App.module.css'

export const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <Outlet />
    </div>
  )
}
