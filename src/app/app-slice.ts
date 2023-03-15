import { RootStateType } from './store'

const initState = {
  status: 'init loading' as RequestStatus,
  error: null as string | null,
}

export const appSlice = (state = initState, action: GlobalAppActionsType): typeof initState => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload }
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export const setAppStatus = (status: RequestStatus) =>
  ({
    type: 'APP/SET-STATUS',
    payload: status,
  } as const)

export const setAppError = (error: string | null) =>
  ({
    type: 'APP/SET-ERROR',
    payload: error,
  } as const)

export const selectAppStatus = (state: RootStateType) => state.app.status
export const selectAppError = (state: RootStateType) => state.app.error

export type RequestStatus = 'idle' | 'init loading' | 'loading' | 'success' | 'failure'

type SetAppStatusAT = ReturnType<typeof setAppStatus>
type SetAppErrorAT = ReturnType<typeof setAppError>
export type GlobalAppActionsType = SetAppStatusAT | SetAppErrorAT
