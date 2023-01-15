import { setAppStatus } from '../../app/app-slice'
import { AppThunk, RootStateType } from '../../app/store'
import { getSortPacksQueryParam } from '../../utils/getSortPacksQueryParam'
import { handleError } from '../../utils/handleError'

import {
  AddPackData,
  cardPacksApi,
  CardPackType,
  GetCardPackResponse,
  GetCardPacksQueryParams,
  SortPacksParams,
} from './card-packs-api'

type InitState = Omit<GetCardPackResponse, 'token' | 'tokenDeathTime'> & {
  packName: string
  sortPacks: string
  loadPrivatePacks: boolean
}

const initState: InitState = {
  cardPacks: [] as CardPackType[],
  packName: '',
  page: 1,
  pageCount: 12,
  sortPacks: getSortPacksQueryParam({ order: 'asc', column: 'updated' }),
  loadPrivatePacks: false,
  minCardsCount: 0,
  maxCardsCount: 25,
  cardPacksTotalCount: 0,
}

export const cardsPackSlice = (
  state = initState,
  action: CardsPackSliceActionsType
): typeof initState => {
  switch (action.type) {
    case 'CARD_PACKS/LOADED':
      return { ...state, ...action.payload }
    case 'CARD_PACKS/NAME_CHANGED':
      return { ...state, packName: action.payload }
    case 'CARD_PACKS/SORT_ORDER_CHANGED':
      return { ...state, sortPacks: getSortPacksQueryParam(action.payload) }
    default:
      return state
  }
}

//actions
const setCardPacks = (cardPacksData: Omit<GetCardPackResponse, 'token' | 'tokenDeathTime'>) => {
  return { type: 'CARD_PACKS/LOADED', payload: cardPacksData } as const
}

//Use this 2 AC to save data for re-fetch packs from another place of app
const setPackName = (name: string) => {
  return { type: 'CARD_PACKS/NAME_CHANGED', payload: name } as const
}

const setPacksSortOrder = (orderParams: SortPacksParams) => {
  return { type: 'CARD_PACKS/SORT_ORDER_CHANGED', payload: orderParams } as const
}

// TODO: didn't find use to this 3 AC. Think again
export const addCardPack = (pack: CardPackType) =>
  ({ type: 'CARD_PACKS/ADDED/', payload: pack } as const)

export const deleteCardPack = (packId: string) =>
  ({ type: 'CARD_PACKS/DELETED', payload: packId } as const)

export const updateCardPack = (packId: string, name: string) =>
  ({ type: 'CARD_PACKS/UPDATED', payload: { packId, name } } as const)

//thunks
export const fetchCardPacksTC =
  (params?: GetCardPacksQueryParams): AppThunk =>
  async (dispatch, getState) => {
    const {
      profile: {
        userData: { _id },
      },
      cardPacks: {
        minCardsCount,
        maxCardsCount,
        page,
        pageCount,
        packName,
        loadPrivatePacks,
        sortPacks,
      },
    } = getState()
    const requestData: GetCardPacksQueryParams = {
      packName: packName || undefined,
      min: minCardsCount,
      max: maxCardsCount,
      sortPacks,
      page,
      pageCount,
      user_id: loadPrivatePacks ? _id : undefined,
      ...params,
    }

    try {
      dispatch(setAppStatus('loading'))
      const { data } = await cardPacksApi.getPacks(requestData)

      dispatch(setCardPacks(data))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const addCardPackTC =
  (packData: AddPackData): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      await cardPacksApi.addPack(packData)
      await dispatch(fetchCardPacksTC())
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const deleteCardPackTC =
  (packId: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      await cardPacksApi.deletePack(packId)
      await dispatch(fetchCardPacksTC())
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const updateCardPackTC =
  (packId: string, newName: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      await cardPacksApi.updatePack(packId, newName)
      await dispatch(fetchCardPacksTC())
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

//selectors
export const selectAllPacks = (state: RootStateType) => state.cardPacks.cardPacks
export const selectAllPacksIds = (state: RootStateType) => selectAllPacks(state).map(p => p._id)
export const selectCardPack = (state: RootStateType, id: string) => {
  return selectAllPacks(state).find(p => p._id === id) as CardPackType
}

//types
type SetCardsPacksAT = ReturnType<typeof setCardPacks>
type addCardPackAT = ReturnType<typeof addCardPack>
type deleteCardPackAT = ReturnType<typeof deleteCardPack>
type updateCardPackAT = ReturnType<typeof updateCardPack>
type setPackNameAT = ReturnType<typeof setPackName>
type setPacksSortOrderAT = ReturnType<typeof setPacksSortOrder>

export type CardsPackSliceActionsType =
  | SetCardsPacksAT
  | addCardPackAT
  | deleteCardPackAT
  | updateCardPackAT
  | setPackNameAT
  | setPacksSortOrderAT

// TODO: add app status processing via dispatching in every thunk
// TODO: think about useless types from API response
// TODO: add helper to prepare query params to clean up getPacks thunk
