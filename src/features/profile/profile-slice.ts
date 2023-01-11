import { AppThunk, RootStateType } from '../../app/store'
import { authAPI, User } from '../auth/auth-api'

const initState = {
  userData: null as User | null,
}

export const profileSlice = (state = initState, action: ActionsType): typeof initState => {
  switch (action.type) {
    case 'profile/loaded':
      return { ...state, userData: action.payload }
    default:
      return state
  }
}

export const setProfile = (profile: User) =>
  ({
    type: 'profile/loaded',
    payload: profile,
  } as const)

export const updateProfile = (patch: Partial<Pick<User, 'name' | 'avatar'>>) =>
  ({
    type: 'profile/update',
    payload: patch,
  } as const)

export const fetchProfile =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    const { data } = await authAPI.login(email, password)

    dispatch(setProfile(data))
  }

export const selectProfile = (state: RootStateType) => state.profile.userData

type SetProfileAT = ReturnType<typeof setProfile>
type ActionsType = SetProfileAT

//TODO: add error handling in thunk
