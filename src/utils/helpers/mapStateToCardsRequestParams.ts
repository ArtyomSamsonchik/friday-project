import { RootStateType } from '../../app/store'
import { GetCardsQueryParams } from '../../features/cards/cards-api'

export const mapStateToCardsRequestParams = (state: RootStateType, params: GetCardsQueryParams) => {
  const { cardSearchName, cardsSortOrder, page, pageCount } = state.cards

  return {
    cardQuestion: cardSearchName || undefined,
    sortCards: cardsSortOrder,
    page,
    pageCount,
    ...params,
  } as GetCardsQueryParams
}

// TODO: limit params type in future to protect fetchCards thunk of unexpected arguments.
//  Do the same with fetchPacks thunk.
