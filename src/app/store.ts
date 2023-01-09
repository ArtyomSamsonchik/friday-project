import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'

import { authSlice, AuthSliceActionType } from '../features/auth/auth-slice'
import { profileSlice } from '../features/profile/profile-slice'

import { appSlice } from './app-slice'

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  profile: profileSlice,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppActionsType = AuthSliceActionType
export type AppThunk<ReturnType = void> = ThunkAction<void, RootStateType, unknown, AppActionsType>
//@ts-ignore
window.store = store
