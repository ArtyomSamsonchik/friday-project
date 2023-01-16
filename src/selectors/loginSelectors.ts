import { RootStateType } from '../app/store'

export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn
export const selectIsRegistered = (state: RootStateType) => state.auth.registered
export const selectIsStateToken = (state: RootStateType) => state.auth.isStateToken
export const selectIsRecalled = (state: RootStateType) => state.auth.isRecalled
