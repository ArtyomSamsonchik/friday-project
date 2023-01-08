import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authSlice } from '../features/auth/auth-slice'
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

//@ts-ignore
window.store = store
