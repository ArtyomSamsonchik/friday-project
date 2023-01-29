import React, { FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '../../app/path'
import { selectIsLoggedIn } from '../../features/auth/login-selectors'
import { useAppSelector } from '../../utils/hooks/useAppSelector'
import { useRedirectLocation } from '../../utils/hooks/useRedirectLocation'

export const RequireAuthRoute: FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const location = useRedirectLocation()

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/${PATH.LOGIN}`}
      state={{ path: location.pathname } as typeof location.state}
      replace
    />
  )
}
