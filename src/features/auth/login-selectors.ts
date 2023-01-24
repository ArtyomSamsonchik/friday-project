import { RootStateType } from '../../app/store'

const selectAuthSlice = (state: RootStateType) => state.auth

export const selectIsLoggedIn = (state: RootStateType) => selectAuthSlice(state).isLoggedIn
export const selectIsRegistered = (state: RootStateType) => selectAuthSlice(state).registered
export const selectIsStateToken = (state: RootStateType) => selectAuthSlice(state).isStateToken
export const selectIsRecalled = (state: RootStateType) => selectAuthSlice(state).isRecalled
