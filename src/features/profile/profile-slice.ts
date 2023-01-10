import { RootStateType } from '../../app/store'
import { User } from '../auth/auth-api'

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

export const selectProfile = (state: RootStateType) => state.profile.userData

type SetProfileAT = ReturnType<typeof setProfile>
type ActionsType = SetProfileAT

//TODO: add error handling in thunk
