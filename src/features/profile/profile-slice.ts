import { AppThunk, RootStateType } from '../../app/store'
import { authAPI, ProfilePatchType, ProfileType } from '../auth/auth-api'
import { setLoggedIn } from '../auth/auth-slice'

const initState = {
  userData: {
    name: '',
    email: '',
    avatar: '',
  } as ProfileType,
}

export const profileSlice = (
  state = initState,
  action: ProfileSliceActionsType
): typeof initState => {
  switch (action.type) {
    case 'PROFILE/LOADED':
      return { ...state, userData: action.payload }
    case 'PROFILE/UPDATED':
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export const setProfile = (profile: ProfileType) =>
  ({
    type: 'PROFILE/LOADED',
    payload: profile,
  } as const)

export const updateProfile = (patch: Pick<ProfileType, 'name' | 'avatar'>) =>
  ({
    type: 'PROFILE/UPDATED',
    payload: patch,
  } as const)

export const fetchUpdatedProfile =
  (patch: ProfilePatchType): AppThunk =>
  async dispatch => {
    const {
      data: { updatedUser },
    } = await authAPI.editProfile(patch)

    dispatch(updateProfile({ name: updatedUser.name, avatar: updatedUser.avatar }))
  }

export const closeSession = (): AppThunk => async dispatch => {
  await authAPI.logout()
  dispatch(setLoggedIn(false))
  dispatch(setLoggedIn(false))
}
export const selectProfile = (state: RootStateType) => state.profile.userData

type SetProfileAT = ReturnType<typeof setProfile>
type updateProfileAT = ReturnType<typeof updateProfile>
export type ProfileSliceActionsType = SetProfileAT | updateProfileAT

// TODO: replace fetchProfile with login thunk
// TODO: add error handling in thunk
