import { RootStateType } from './store'

const initState = {
  status: 'loading' as RequestStatusType,
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

export const setAppStatus = (status: RequestStatusType) =>
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

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failure'

type SetAppStatusAT = ReturnType<typeof setAppStatus>
type SetAppErrorAT = ReturnType<typeof setAppError>
export type GlobalAppActionsType = SetAppStatusAT | SetAppErrorAT
