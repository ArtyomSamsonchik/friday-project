import { setAppStatus } from '../../app/app-slice'
import { AppThunk, RootStateType } from '../../app/store'
import { getFetchCardPacksQueryParams } from '../../utils/getFetchCardPacksQueryParams'
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

const initState = {
  cardPacks: [] as CardPackType[],
  packSearchName: '',
  currentPage: 1,
  itemsPerPage: 12,
  sortPacksOrder: getSortPacksQueryParam({ order: 'desc', column: 'updated' }),
  loadPersonalPacks: false,
  minCardsCount: 0,
  maxCardsCount: 25,
  cardPacksTotalCount: 0,
}

export const cardsPackSlice = (
  state = initState,
  action: CardsPackSliceActionsType
): typeof initState => {
  switch (action.type) {
    case 'CARD_PACKS/LOADED': {
      const { cardPacks, cardPacksTotalCount } = action.payload

      return { ...state, cardPacks, cardPacksTotalCount }
    }
    case 'CARD_PACKS/SEARCH_NAME_CHANGED':
      return { ...state, packSearchName: action.payload }
    case 'CARD_PACKS/SORT_ORDER_CHANGED':
      return { ...state, sortPacksOrder: getSortPacksQueryParam(action.payload) }
    case 'CARD_PACKS/MIN_COUNT_CHANGED':
      return { ...state, minCardsCount: action.payload }
    case 'CARD_PACKS/MAX_COUNT_CHANGED':
      return { ...state, maxCardsCount: action.payload }
    case 'CARD_PACKS/PAGE_CHANGED':
      return { ...state, currentPage: action.payload }
    case 'CARD_PACKS/ITEMS_COUNT_PER_PAGE_CHANGED':
      return { ...state, itemsPerPage: action.payload }
    case 'CARD_PACKS/PERSONAL_PACKS_PARAM_CHANGED':
      return { ...state, loadPersonalPacks: action.payload }
    case 'CARD_PACKS/FILTERS_CLEARED': {
      const initStateCopy: Partial<typeof initState> = { ...initState }

      delete initStateCopy.cardPacks
      delete initStateCopy.cardPacksTotalCount

      return { ...state, ...initStateCopy }
    }
    default:
      return state
  }
}

//actions
export const setCardPacks = (
  cardPacksData: Omit<GetCardPackResponse, 'token' | 'tokenDeathTime'>
) => {
  return { type: 'CARD_PACKS/LOADED', payload: cardPacksData } as const
}
export const setPackSearchName = (name: string) => {
  return { type: 'CARD_PACKS/SEARCH_NAME_CHANGED', payload: name } as const
}
export const setPacksSortOrder = (orderParams: SortPacksParams) => {
  return { type: 'CARD_PACKS/SORT_ORDER_CHANGED', payload: orderParams } as const
}
export const setMinCardsCount = (count: number) => {
  return { type: 'CARD_PACKS/MIN_COUNT_CHANGED', payload: count } as const
}
export const setMaxCardsCount = (count: number) => {
  return { type: 'CARD_PACKS/MAX_COUNT_CHANGED', payload: count } as const
}
export const setCurrentPage = (page: number) => {
  return { type: 'CARD_PACKS/PAGE_CHANGED', payload: page } as const
}
export const setItemsPerPage = (count: number) => {
  return { type: 'CARD_PACKS/ITEMS_COUNT_PER_PAGE_CHANGED', payload: count } as const
}
export const setPersonalPacksParam = (isPersonal: boolean) => {
  return { type: 'CARD_PACKS/PERSONAL_PACKS_PARAM_CHANGED', payload: isPersonal } as const
}
export const clearPacksFilters = () => ({ type: 'CARD_PACKS/FILTERS_CLEARED' } as const)

//thunks
export const fetchCardPacksTC =
  (params?: GetCardPacksQueryParams): AppThunk =>
  async (dispatch, getState) => {
    const requestData = getFetchCardPacksQueryParams(getState())
    const sortData = { ...requestData, ...params }

    try {
      dispatch(setAppStatus('loading'))
      const { data } = await cardPacksApi.getPacks(sortData)

      console.log(sortData)
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
export const selectCardPacksSlice = (state: RootStateType) => state.cardPacks
export const selectAllPacks = (state: RootStateType) => selectCardPacksSlice(state).cardPacks
export const selectAllPacksIds = (state: RootStateType) => selectAllPacks(state).map(p => p._id)
export const selectCardPack = (state: RootStateType, id: string) => {
  return selectAllPacks(state).find(p => p._id === id) as CardPackType
}

//types
type SetCardsPacksAT = ReturnType<typeof setCardPacks>
type setPackNameAT = ReturnType<typeof setPackSearchName>
type setPacksSortOrderAT = ReturnType<typeof setPacksSortOrder>
type setMinCardsCountAT = ReturnType<typeof setMinCardsCount>
type setMaxCardsCountAT = ReturnType<typeof setMaxCardsCount>
type setCurrentPageAT = ReturnType<typeof setCurrentPage>
type setItemsPerPageAT = ReturnType<typeof setItemsPerPage>
type setPersonalPacksParamAT = ReturnType<typeof setPersonalPacksParam>
type clearPacksFiltersAT = ReturnType<typeof clearPacksFilters>

export type CardsPackSliceActionsType =
  | SetCardsPacksAT
  | setPackNameAT
  | setPacksSortOrderAT
  | setMinCardsCountAT
  | setMaxCardsCountAT
  | setCurrentPageAT
  | setItemsPerPageAT
  | setPersonalPacksParamAT
  | clearPacksFiltersAT

// TODO: add app status processing via dispatching in every thunk
// TODO: think about useless types from API response
// TODO: add helper to prepare query params to clean up getPacks thunk
