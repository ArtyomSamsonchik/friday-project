import { AppThunk } from '../../app/store'
import { setProfile } from '../profile/profile-slice'

import { authAPI } from './auth-api'

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

export const fetchProfile =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    const { data } = await authAPI.login(email, password)

    dispatch(setProfile(data))
  }

type LoginAT = ReturnType<typeof login>
type ActionsType = LoginAT

//TODO: add app status processing via dispatching in every thunk
