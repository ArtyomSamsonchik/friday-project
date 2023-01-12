import { Dispatch } from 'redux'

import { AppThunk } from '../../app/store'

import { authAPI, ForgotRequestType, LoginParamsType, RegisterDataType } from './auth-api'

const initState = {
  isLoggedIn: false,
  registered: false,
  isRecalled: false,
}

type initStateType = typeof initState
export type AuthSliceActionType = ReturnType<typeof isRegister> | LoginAT | SetForgotPasswordAT

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
//types
type LoginAT = ReturnType<typeof setLoggedIn>
type SetForgotPasswordAT = ReturnType<typeof setRecallPassword>
//TODO: add app status processing via dispatching in every thunk
