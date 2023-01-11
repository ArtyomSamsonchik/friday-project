import { authApi, RegisterDataType } from '../../app/api-instance'
import { AppThunk } from '../../app/store'

import { authAPI } from './auth-api'

const initState = {
  isLoggedIn: false,
  registered: false,
}

type initStateType = typeof initState
export type AuthSliceActionType = ReturnType<typeof isRegister>

export const authSlice = (
  state: initStateType = initState,
  action: AuthSliceActionType
): typeof initState => {
  switch (action.type) {
    /* case 'auth/login':
                   return { ...state, isLoggedIn: true }*/
    case 'AUTH/IS-REGISTERED':
      return { ...state, registered: action.value }

    default:
      return state
  }
}

export const login = () => ({ type: 'auth/login' } as const)
const isRegister = (value: true) => {
  return { type: 'AUTH/IS-REGISTERED', value } as const
}

export const isRegisterTC =
  (data: RegisterDataType): AppThunk =>
  async dispatch => {
    const res = await authApi.register(data).then(res => res.data)

    dispatch(isRegister(true))
  }
/*export const fetchProfile =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    const { data } = await authAPI.login(email, password)

    dispatch(setProfile(data))
  }*/

type LoginAT = ReturnType<typeof login>
type ActionsType = LoginAT

//TODO: add app status processing via dispatching in every thunk
