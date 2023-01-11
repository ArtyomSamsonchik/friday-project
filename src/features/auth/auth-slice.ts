const initState = {
  isLoggedIn: false,
}

export const authSlice = (state = initState, action: ActionsType): typeof initState => {
  switch (action.type) {
    case 'auth/login':
      return { ...state, isLoggedIn: true }
    default:
      return state
  }
}

export const login = () => ({ type: 'auth/login' } as const)

type LoginAT = ReturnType<typeof login>
type ActionsType = LoginAT

//TODO: add app status processing via dispatching in every thunk
