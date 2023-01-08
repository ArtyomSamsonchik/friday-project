import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import App from './app/App'
import { PATH } from './app/path'
import store from './app/store'
import ErrorPage from './components/ErrorPage/ErrorPage'
import Login from './components/Login/Login'
import NewPassword from './components/NewPassword/NewPassword'
import Profile from './components/Profile/Profile'
import RestorePassword from './components/RestorePassword/RestorePassword'
import SignUp from './components/SignUp/SignUp'
import Test from './components/Test/Test'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
      <Route path={PATH.RESTORE_PASSWORD} element={<RestorePassword />} />
      <Route path={PATH.TEST} element={<Test />} />
      <Route path={PATH.ERROR} element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
