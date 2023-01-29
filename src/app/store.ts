import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authSlice, AuthSliceActionType } from '../features/auth/auth-slice'
import { cardsSlice, CardsSliceActions } from '../features/cards/cards-slice'
import { cardsPackSlice, CardsPackSliceActionsType } from '../features/cardsPack/cards-pack-slice'
import { profileSlice, ProfileSliceActionsType } from '../features/profile/profile-slice'

import { appSlice, GlobalAppActionsType } from './app-slice'

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  profile: profileSlice,
  packs: cardsPackSlice,
  cards: cardsSlice,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppActionsType =
  | AuthSliceActionType
  | ProfileSliceActionsType
  | GlobalAppActionsType
  | CardsPackSliceActionsType
  | CardsSliceActions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  AppActionsType
>

//@ts-ignore
if (process.env.NODE_ENV === 'development') window.store = store
