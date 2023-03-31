import { setAppStatus } from '../../app/app-slice'
import { AppThunk } from '../../app/store'
import { handleError } from '../../utils/helpers/handleError'
import { mapStateToPacksRequestParams } from '../../utils/helpers/mapStateToPacksRequestParams'
import { stringifySortQueryParams } from '../../utils/helpers/stringifySortQueryParams'

import {
  AddPackData,
  cardPacksApi,
  CardPackType,
  GetCardPackResponse,
  GetCardPacksQueryParams,
  SortPacksParams,
  UpdatePackData,
} from './card-packs-api'

const initState = {
  cardPacks: [] as CardPackType[],
  packSearchName: '',
  currentPage: 1,
  itemsPerPage: 12,
  packsSortOrder: stringifySortQueryParams({ order: 'desc', column: 'updated' }),
  loadPersonalPacks: false,
  minCardsCount: 0,
  maxCardsCount: 110,
  cardPacksTotalCount: 0,
}

export const cardsPackSlice = (
  state = initState,
  action: CardsPackSliceActionsType
): typeof initState => {
  switch (action.type) {
    case 'CARD_PACKS/LOADED': {
      const { cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount } = action.payload

      return { ...state, cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount }
    }
    case 'CARD_PACKS/SEARCH_NAME_CHANGED':
      return { ...state, packSearchName: action.payload }
    case 'CARD_PACKS/SORT_ORDER_CHANGED':
      return { ...state, packsSortOrder: stringifySortQueryParams(action.payload) }
    case 'CARD_PACKS/PAGE_CHANGED':
      return { ...state, currentPage: action.payload }
    case 'CARD_PACKS/ITEMS_COUNT_PER_PAGE_CHANGED':
      return { ...state, itemsPerPage: action.payload }
    case 'CARD_PACKS/PERSONAL_PACKS_PARAM_CHANGED':
      return { ...state, loadPersonalPacks: action.payload }
    case 'CARD_PACKS/PACKS_CLEANED':
      return { ...state, cardPacks: [] }
    case 'CARD_PACKS/FILTERS_CLEANED': {
      const initStateCopy: Partial<typeof initState> = { ...initState }

      delete initStateCopy.cardPacks
      delete initStateCopy.cardPacksTotalCount

      return { ...state, ...initStateCopy }
    }
    /*case 'CARD_PACKS/MIN-MAX-CARDS-COUNT': {
      return { ...state, maxCardsCount: action.payload.max, minCardsCount: action.payload.min }
    }*/
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
export const setCurrentPackPage = (page: number) => {
  return { type: 'CARD_PACKS/PAGE_CHANGED', payload: page } as const
}
export const setPackItemsPerPage = (count: number) => {
  return { type: 'CARD_PACKS/ITEMS_COUNT_PER_PAGE_CHANGED', payload: count } as const
}
export const setPersonalPacksParam = (isPersonal: boolean) => {
  return { type: 'CARD_PACKS/PERSONAL_PACKS_PARAM_CHANGED', payload: isPersonal } as const
}
export const setMinAndMaxCardsCount = (cardsCount: { min: number; max: number }) =>
  ({
    type: 'CARD_PACKS/MIN-MAX-CARDS-COUNT',
    payload: cardsCount,
    //
  } as const)
export const cleanPacks = () => {
  return { type: 'CARD_PACKS/PACKS_CLEANED' } as const
}
export const clearPacksFilters = () => ({ type: 'CARD_PACKS/FILTERS_CLEANED' } as const)

//thunks
export const DEPRECATED_fetchCardPacksTC =
  (params?: GetCardPacksQueryParams): AppThunk =>
  async (dispatch, getState) => {
    const requestData = mapStateToPacksRequestParams(getState())
    const sortData = { ...requestData, ...params }

    try {
      dispatch(setAppStatus('loading'))
      const { data } = await cardPacksApi.getPacks(sortData)

      dispatch(setCardPacks(data))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const fetchCardPacksTC = (): AppThunk => async (dispatch, getState) => {
  const requestData = mapStateToPacksRequestParams(getState())

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
  (data: UpdatePackData): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      await cardPacksApi.updatePack(data)
      await dispatch(fetchCardPacksTC())
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

//types
type SetCardsPacksAT = ReturnType<typeof setCardPacks>
type SetPackNameAT = ReturnType<typeof setPackSearchName>
type SetPacksSortOrderAT = ReturnType<typeof setPacksSortOrder>
type SetCurrentPageAT = ReturnType<typeof setCurrentPackPage>
type SetItemsPerPageAT = ReturnType<typeof setPackItemsPerPage>
type SetPersonalPacksParamAT = ReturnType<typeof setPersonalPacksParam>
type ClearPacksFiltersAT = ReturnType<typeof clearPacksFilters>
type CleanPacksAT = ReturnType<typeof cleanPacks>
type SetMinAndMaxCardsCountAT = ReturnType<typeof setMinAndMaxCardsCount>
export type CardsPackSliceActionsType =
  | SetCardsPacksAT
  | SetPackNameAT
  | SetPacksSortOrderAT
  | SetCurrentPageAT
  | SetItemsPerPageAT
  | SetPersonalPacksParamAT
  | ClearPacksFiltersAT
  | CleanPacksAT
  | SetMinAndMaxCardsCountAT

// TODO: add app status processing via dispatching in every thunk
// TODO: think about useless types from API response
// TODO: add helper to prepare query params to clean up getPacks thunk
