import { EntityStatus, setAppStatus } from '../../app/app-slice'
import { AppThunk } from '../../app/store'
import { handleError } from '../../utils/helpers/handleError'
import { mapStateToCardsRequestParams } from '../../utils/helpers/mapStateToCardsRequestParams'
import { stringifySortQueryParams } from '../../utils/helpers/stringifySortQueryParams'

import {
  AddCardRequestData,
  Card,
  cardsApi,
  GetCardsQueryParams,
  GetCardsResponse,
  SortCardsParams,
  UpdateCardGradeRequestData,
  UpdateCardRequestData,
} from './cards-api'

const initState = {
  status: 'idle' as CardsStatus,
  cards: [] as Card[],
  packName: '',
  cardSearchName: '',
  cardsSortOrder: stringifySortQueryParams({ order: 'asc', column: 'updated' }),
  packIsPrivate: false,
  page: 1,
  pageCount: 12,
  cardsTotalCount: 0,
  packUserId: '',
  // maxGrade: 0,
  // minGrade: 0,
  // packUpdated: string
  // packCreated: string
}

export const cardsSlice = (state = initState, action: CardsSliceActions): typeof initState => {
  switch (action.type) {
    case 'CARDS/LOADED': {
      const { cards, packName, packPrivate, page, pageCount, cardsTotalCount, packUserId } =
        action.payload

      return {
        ...state,
        cards,
        packName,
        packIsPrivate: packPrivate,
        page,
        pageCount,
        cardsTotalCount,
        packUserId,
      }
    }
    case 'CARDS/SEARCH_NAME_CHANGED':
      return { ...state, cardSearchName: action.payload }
    case 'CARDS/SORT_PARAMS_CHANGED':
      return { ...state, cardsSortOrder: stringifySortQueryParams(action.payload) }
    case 'CARDS/PAGE_CHANGED':
      return { ...state, page: action.payload }
    case 'CARDS/ITEMS_PER_PAGE_CHANGED':
      return { ...state, pageCount: action.payload }
    case 'CARDS/CARDS_CLEANED':
      return { ...state, cards: [], packName: '', packUserId: '' }
    case 'CARDS/STATUS_CHANGED':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

//actions
export const setCards = (cardsData: GetCardsResponse) => {
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
export const cleanCards = () => {
  return { type: 'CARDS/CARDS_CLEANED' } as const
}
export const setCardsStatus = (status: CardsStatus) => {
  return { type: 'CARDS/STATUS_CHANGED', payload: status } as const
}

//thunks
export const fetchCardsTC =
  (params: GetCardsQueryParams): AppThunk =>
  async (dispatch, getState) => {
    const requestData = mapStateToCardsRequestParams(getState(), params)

    try {
      dispatch(setAppStatus('loading'))
      const { data } = await cardsApi.getCards(requestData)

      dispatch(setCards(data))
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const getCardForLearning =
  (params: GetCardsQueryParams): AppThunk =>
  async dispatch => {
    /*const requestData = mapStateToCardsRequestParams(getState(), params)*/

    try {
      dispatch(setAppStatus('loading'))
      const { data } = await cardsApi.getCards(params)

      dispatch(setAppStatus('success'))

      return data.cards
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const updateCardGradeTC =
  (data: UpdateCardGradeRequestData): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      await cardsApi.updateCardGrade(data)
      dispatch(setAppStatus('success'))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const addCardTC =
  (cardData: AddCardRequestData): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setCardsStatus('adding item'))

      await cardsApi.addCard(cardData)
      dispatch(setCardsStatus('idle'))
      dispatch(fetchCardsTC({ cardsPack_id: cardData.cardsPack_id }))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const deleteCardTC =
  (packId: string, cardId: string): AppThunk<Promise<void>> =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setCardsStatus('deleting'))

      await cardsApi.deleteCard(cardId)
      dispatch(setCardsStatus('idle'))
      dispatch(fetchCardsTC({ cardsPack_id: packId }))
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

export const updateCardTC =
  (data: UpdateCardRequestData & { packId: string }): AppThunk<Promise<Card | undefined>> =>
  async dispatch => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setCardsStatus('updating'))
      const result = await cardsApi.updateCard(data)

      dispatch(setCardsStatus('idle'))
      dispatch(fetchCardsTC({ cardsPack_id: data.packId }))

      return result.data.updatedCard
    } catch (e) {
      handleError(e as Error, dispatch)
    }
  }

//types
type SetCardsAT = ReturnType<typeof setCards>
type SetCardsSearchNameAT = ReturnType<typeof setCardsSearchName>
type SetCardsSortOrderAT = ReturnType<typeof setCardsSortOrder>
type SetCurrentCardsPageAT = ReturnType<typeof setCurrentCardsPage>
type SetCardItemsPerPageAT = ReturnType<typeof setCardItemsPerPage>
type CleanCardsAT = ReturnType<typeof cleanCards>
type SetCardsStatusAT = ReturnType<typeof setCardsStatus>

export type CardsSliceActions =
  | SetCardsAT
  | SetCardsSearchNameAT
  | SetCardsSortOrderAT
  | SetCurrentCardsPageAT
  | SetCardItemsPerPageAT
  | CleanCardsAT
  | SetCardsStatusAT

type CardsStatus = EntityStatus | 'updating grade'

//TODO: remove unnecessary properties in init state
//TODO: add mapper-helper to CARDS_LOADED reducer case
