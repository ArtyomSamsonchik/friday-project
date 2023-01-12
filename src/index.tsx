import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import { App } from './app/App'
import { PATH } from './app/path'
import { store } from './app/store'
import { ErrorPage } from './common/components/ErrorPage/ErrorPage'
import { Login } from './common/components/Login/Login'
import { NewPassword } from './common/components/NewPassword/NewPassword'
import { Profile } from './common/components/Profile/Profile'
import { CheckEmail } from './common/components/RestorePassword/CheckEmail/CheckEmail'
import { RestorePassword } from './common/components/RestorePassword/RestorePassword'
import { SignUp } from './common/components/SignUp/SignUp'
import { Test } from './common/components/Test/Test'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.RESTORE_PASSWORD} element={<RestorePassword />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.ERROR} element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
