import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authSlice } from '../features/auth/auth-slice'

const rootReducer = combineReducers({
  auth: authSlice,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store
