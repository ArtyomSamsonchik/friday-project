import { RequestStatus } from '../../app/app-slice'
import { AppThunk, RootStateType } from '../../app/store'
import { handleError } from '../../utils/helpers/handleError'
import { authAPI, ProfilePatchType, ProfileType } from '../auth/auth-api'
import { setLoggedIn } from '../auth/auth-slice'

const initState = {
  status: 'idle' as RequestStatus,
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
    case 'PROFILE/STATUS_CHANGED':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

//actions
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

export const setProfileStatus = (status: RequestStatus) =>
  ({
    type: 'PROFILE/STATUS_CHANGED',
    payload: status,
  } as const)

//thunks
export const fetchUpdatedProfile =
  (patch: ProfilePatchType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setProfileStatus('loading'))
      const { data } = await authAPI.editProfile(patch)
      const { avatar, name } = data.updatedUser

      dispatch(updateProfile({ name, avatar }))
      dispatch(setProfileStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const closeSession = (): AppThunk => async dispatch => {
  try {
    dispatch(setProfileStatus('loading'))
    await authAPI.logout()

    dispatch(setLoggedIn(false))
    dispatch(setLoggedIn(false))
    dispatch(setProfileStatus('success'))
  } catch (e) {
    handleError(e as Error, dispatch)
  }
}

//selectors
export const selectProfile = (state: RootStateType) => state.profile.userData
export const selectProfileStatus = (state: RootStateType) => state.profile.status

type SetProfileAT = ReturnType<typeof setProfile>
type UpdateProfileAT = ReturnType<typeof updateProfile>
type SetProfileStatusAT = ReturnType<typeof setProfileStatus>
export type ProfileSliceActionsType = SetProfileAT | UpdateProfileAT | SetProfileStatusAT

//TODO: determine an application's behavior then loading
// to disable elements and show skeletons / progressbar
