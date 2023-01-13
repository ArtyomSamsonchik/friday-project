import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authSlice, AuthSliceActionType } from '../features/auth/auth-slice'
import { profileSlice, ProfileSliceActionsType } from '../features/profile/profile-slice'

import { appSlice, GlobalAppActionsType } from './app-slice'

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  profile: profileSlice,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AppActionsType = AuthSliceActionType | ProfileSliceActionsType | GlobalAppActionsType
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  AppActionsType
>

//@ts-ignore
window.store = store
