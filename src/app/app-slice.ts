const initState = {
  status: 'idle' as RequestStatusType,
}

export const appSlice = (state = initState, action: ActionsType): typeof initState => {
  switch (action.type) {
    case 'app/setStatus':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: 'app/setStatus',
    payload: status,
  } as const)

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failure'

type SetAppStatusAT = ReturnType<typeof setAppStatus>
type ActionsType = SetAppStatusAT
