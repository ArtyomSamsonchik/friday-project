import { authApi, RegisterDataType } from '../../app/api-instance'
import { AppThunk } from '../../app/store'

const initState = {
  registered: false,
}

type initStateType = typeof initState
export type AuthSliceActionType = ReturnType<typeof isRegister>

export const authSlice = (
  state: initStateType = initState,
  action: AuthSliceActionType
): typeof initState => {
  switch (action.type) {
    case 'AUTH/IS-REGISTERED':
      return { ...state, registered: action.value }
    default:
      return state
  }
}
const isRegister = (value: true) => {
  return { type: 'AUTH/IS-REGISTERED', value } as const
}

export const isRegisterTC =
  (data: RegisterDataType): AppThunk =>
  dispatch => {
    authApi.register(data).then(res => res.data)
    dispatch(isRegister(true))
  }
