import { RootStateType } from '../app/store'
import { GetCardsQueryParams } from '../features/cards/cards-api'

export const getFetchCardsQueryParams = (state: RootStateType, packId: string) => {
  const { cardSearchName, cardsSortOrder, page, pageCount } = state.cards

  return {
    cardsPack_id: packId,
    cardQuestion: cardSearchName || undefined,
    sortCards: cardsSortOrder,
    page,
    pageCount,
  } as GetCardsQueryParams
}
