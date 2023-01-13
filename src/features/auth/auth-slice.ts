import { authApi, LoginParamsType, RegisterDataType } from '../../app/api-instance'
import { AppThunk, RootStateType } from '../../app/store'

const initState = {
  isLoggedIn: false,
  registered: false,
}

type initStateType = typeof initState
export type AuthSliceActionType = ReturnType<typeof isRegister> | LoginAT

export const authSlice = (
  state: initStateType = initState,
  action: AuthSliceActionType
): initStateType => {
  switch (action.type) {
    case 'AUTH/IS-REGISTERED':
      return {...state, registered: action.value}
    case 'AUTH/LOGIN':
      return {...state, isLoggedIn: action.isLoggedIn}
    default:
      return state
  }
}

//actions
export const setLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/LOGIN', isLoggedIn} as const)
const isRegister = (value: true) => {
  return {type: 'AUTH/IS-REGISTERED', value} as const
}

//thunk
export const isRegisterTC =
  (data: RegisterDataType): AppThunk =>
    async dispatch => {
      await authApi.register(data)
      dispatch(isRegister(true))
    }

export const LoginTC =
  (values: LoginParamsType): AppThunk =>
    async dispatch => {
      try {
        const loginData = await authApi.login(values)
        console.log(loginData)
        if (loginData) {
          dispatch(setLoggedIn(true))
        }
      } catch (e: any) {
        const error = e.response ? e.response.data.error : e.message + ', more details in the console'
      }
    }

export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn
export const selectIsRegistered = (state: RootStateType) => state.auth.registered

//types
type LoginAT = ReturnType<typeof setLoggedIn>

//TODO: add app status processing via dispatching in every thunk
