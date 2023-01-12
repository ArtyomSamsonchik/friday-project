import { Dispatch } from 'redux'

import { AppThunk } from '../../app/store'

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
  isStateToken: '',
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
    await authAPI.register(data)
    dispatch(isRegister(true))
  }

export const loginTC =
  (values: LoginParamsType): AppThunk =>
  async dispatch => {
    dispatch(setRecallPassword(false))
    try {
      const loginData = await authAPI.login(values)

      if (loginData) {
        dispatch(setLoggedIn(true))
      }
    } catch (e: any) {
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'
    }
  }

export const recallPasswordTC =
  (email: string): AppThunk =>
  (dispatch: Dispatch) => {
    const data: ForgotRequestType = {
      email,
      from: 'admin <samvelbagdasaryan1@gmail.com>',
      message: `<div style="background-color: lime; padding: 15px">
                  password recovery link: 
                  <a href='https://artyomsamsonchik.github.io/friday-project/#/new-password/$token$'>
                  link</a>
                </div>`,
    }

    authAPI.forgot(data).then(res => {
      dispatch(setRecallPassword(true))
    })
  }

export const setNewPasswordTC =
  (password: string, token: string): AppThunk =>
  (dispatch: Dispatch) => {
    const data: NewPasswordRequestType = {
      password,
      resetPasswordToken: token,
    }

    authAPI.setNewPassword(data).then(res => {
      console.log(res.data.info)
    })
  }

//types
type LoginAT = ReturnType<typeof setLoggedIn>
type SetForgotPasswordAT = ReturnType<typeof setRecallPassword>
type SetNewPasswordAT = ReturnType<typeof setNewPasswordToken>
//TODO: add app status processing via dispatching in every thunk
