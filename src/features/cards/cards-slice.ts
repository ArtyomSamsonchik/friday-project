import { setAppStatus } from '../../app/app-slice'
import { AppThunk } from '../../app/store'
import { getFetchCardsQueryParams } from '../../utils/getFetchCardsQueryParams'
import { handleError } from '../../utils/handleError'
import { stringifySortQueryParams } from '../../utils/stringifySortQueryParams'

import {
  AddCardRequestData,
  Card,
  cardsApi,
  GetCardsResponse,
  SortCardsParams,
  UpdateCardRequestData,
} from './cards-api'

const initState = {
  cards: [] as Card[],
  packId: '',
  packName: '',
  cardSearchName: '',
  cardsSortOrder: stringifySortQueryParams({ order: 'asc', column: 'updated' }),
  packIsPrivate: false,
  page: 1,
  pageCount: 12,
  cardsTotalCount: 0,
  // maxGrade: 0,
  // minGrade: 0,
  // packUserId: '',
  // packUpdated: string
  // packCreated: string
}

export const cardsSlice = (state = initState, action: CardsSliceActions): typeof initState => {
  switch (action.type) {
    case 'CARDS/LOADED': {
      const payloadCopy = { ...action.payload } as Partial<SetCardsData>
      const { packPrivate: packIsPrivate } = action.payload

      delete payloadCopy.packPrivate

      return { ...state, ...payloadCopy, packIsPrivate }
    }
    case 'CARDS/SEARCH_NAME_CHANGED':
      return { ...state, cardSearchName: action.payload }
    case 'CARDS/SORT_PARAMS_CHANGED':
      return { ...state, cardsSortOrder: stringifySortQueryParams(action.payload) }
    case 'CARDS/PAGE_CHANGED':
      return { ...state, page: action.payload }
    case 'CARDS/ITEMS_PER_PAGE_CHANGED':
      return { ...state, pageCount: action.payload }
    default:
      return state
  }
}

//actions
export const setCards = (cardsData: SetCardsData) => {
  return { type: 'CARDS/LOADED', payload: cardsData } as const
}
export const setCardsSearchName = (name: string) => {
  return { type: 'CARDS/SEARCH_NAME_CHANGED', payload: name } as const
}
export const setCardsSortOrder = (orderParams: SortCardsParams) => {
  return { type: 'CARDS/SORT_PARAMS_CHANGED', payload: orderParams } as const
}
export const setCurrentCardsPage = (page: number) => {
  return { type: 'CARDS/PAGE_CHANGED', payload: page } as const
}
export const setCardItemsPerPage = (count: number) => {
  return { type: 'CARDS/ITEMS_PER_PAGE_CHANGED', payload: count } as const
}

//thunks
export const fetchCardsTC =
  (packId: string): AppThunk =>
  async (dispatch, getState) => {
    const requestData = getFetchCardsQueryParams(getState())

    try {
      dispatch(setAppStatus('loading'))
      const { data } = await cardsApi.getCards(requestData)

      dispatch(setCards({ ...data, packId }))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const addCardTC =
  (cardData: Omit<AddCardRequestData, 'cardsPack_id'>): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { packId } = getState().cards

      dispatch(setAppStatus('loading'))
      await cardsApi.addCard({ ...cardData, cardsPack_id: packId })

      dispatch(fetchCardsTC(packId))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const deleteCardTC =
  (cardId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { packId } = getState().cards

      dispatch(setAppStatus('loading'))
      await cardsApi.deleteCard(cardId)

      dispatch(fetchCardsTC(packId))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const updateCardTC =
  (data: UpdateCardRequestData): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { packId } = getState().cards

      dispatch(setAppStatus('loading'))
      await cardsApi.updateCard(data)

      dispatch(fetchCardsTC(packId))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

//types
type SetCardsData = Pick<
  GetCardsResponse,
  'cards' | 'packName' | 'cardsTotalCount' | 'page' | 'pageCount' | 'packPrivate'
> & { packId: string }

type SetCardsAT = ReturnType<typeof setCards>
type SetCardsSearchNameAT = ReturnType<typeof setCardsSearchName>
type SetCardsSortOrderAT = ReturnType<typeof setCardsSortOrder>
type SetCurrentCardsPageAT = ReturnType<typeof setCurrentCardsPage>
type SetCardItemsPerPageAT = ReturnType<typeof setCardItemsPerPage>

export type CardsSliceActions =
  | SetCardsAT
  | SetCardsSearchNameAT
  | SetCardsSortOrderAT
  | SetCurrentCardsPageAT
  | SetCardItemsPerPageAT

// TODO: remove unnecessary properties in init state
