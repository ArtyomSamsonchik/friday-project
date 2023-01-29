import { AxiosError, HttpStatusCode } from 'axios'

import { setAppStatus } from '../../app/app-slice'
import { AppThunk } from '../../app/store'
import { handleError } from '../../utils/helpers/handleError'
import { setProfile } from '../profile/profile-slice'

import {
  authAPI,
  ForgotRequestType,
  LoginParamsType,
  NewPasswordRequestType,
  RegisterDataType,
} from './auth-api'

const initState = {
  isLoggedIn: false,
  registered: false,
  isRecalled: false,
  isStateToken: 'token',
}

type initStateType = typeof initState
export type AuthSliceActionType =
  | ReturnType<typeof isRegister>
  | LoginAT
  | SetForgotPasswordAT
  | SetNewPasswordAT

export const authSlice = (
  state: initStateType = initState,
  action: AuthSliceActionType
): initStateType => {
  switch (action.type) {
    case 'AUTH/IS-REGISTERED':
      return { ...state, registered: action.value }
    case 'AUTH/LOGIN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    case 'AUTH/FORGOT-PASSWORD':
      return { ...state, isRecalled: action.isRecalled }
    case 'AUTH/SET-NEW-PASSWORD-TOKEN':
      return { ...state, isStateToken: action.token }
    default:
      return state
  }
}

//actions
export const setLoggedIn = (isLoggedIn: boolean) => ({ type: 'AUTH/LOGIN', isLoggedIn } as const)
const isRegister = (value: true) => {
  return { type: 'AUTH/IS-REGISTERED', value } as const
}

export const setRecallPassword = (isRecalled: boolean) =>
  ({ type: 'AUTH/FORGOT-PASSWORD', isRecalled } as const)
export const setNewPasswordToken = (token: string) =>
  ({ type: 'AUTH/SET-NEW-PASSWORD-TOKEN', token } as const)

//thunk
export const isRegisterTC =
  (data: RegisterDataType): AppThunk =>
  async dispatch => {
    try {
      await authAPI.register(data)
      dispatch(isRegister(true))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const loginTC =
  (values: LoginParamsType): AppThunk =>
  async dispatch => {
    dispatch(setRecallPassword(false))
    try {
      const { data } = await authAPI.login(values)

      dispatch(setLoggedIn(true))
      dispatch(setProfile(data))
    } catch (e) {
      // const error = e.response ? e.response.data.error : e.message + ', more details in the console'
      handleError(e as Error, dispatch)
    }
  }

export const recallPasswordTC =
  (email: string): AppThunk =>
  async dispatch => {
    try {
      const data: ForgotRequestType = {
        email,
        from: 'admin <samvelbagdasaryan1@gmail.com>',
        message: `<div style="background-color: lime; padding: 15px">
                  password recovery link: 
                  <a href='https://artyomsamsonchik.github.io/friday-project/#/new-password/$token$'>
                  link</a>
                </div>`,
      }

      await authAPI.forgot(data)
      dispatch(setRecallPassword(true))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const setNewPasswordTC =
  (password: string, token: string): AppThunk =>
  async dispatch => {
    try {
      const data: NewPasswordRequestType = {
        password,
        resetPasswordToken: token,
      }

      await authAPI.setNewPassword(data)

      dispatch(setNewPasswordToken(''))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }
export const authTC = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus('init loading'))
    const { data } = await authAPI.me()

    dispatch(setLoggedIn(true))
    dispatch(setProfile(data))
    dispatch(setAppStatus('success'))
  } catch (e) {
    //skip auth error handling at init app loading
    const isUnauthorizedOnAuth = (e as AxiosError)?.response?.status === HttpStatusCode.Unauthorized

    if (isUnauthorizedOnAuth) dispatch(setAppStatus('failure'))
    else handleError(e as Error, dispatch)
  }
}

//types
type LoginAT = ReturnType<typeof setLoggedIn>
type SetForgotPasswordAT = ReturnType<typeof setRecallPassword>
type SetNewPasswordAT = ReturnType<typeof setNewPasswordToken>
//TODO: add app status processing via dispatching in every thunk
