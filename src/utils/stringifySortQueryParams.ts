import { SortCardsParams } from '../features/cards/cards-api'
import { SortPacksParams } from '../features/cardsPack/card-packs-api'

//Use this function to get sortPacks query parameter for cardsApi
export const stringifySortQueryParams = ({ order, column }: SortPacksParams | SortCardsParams) =>
  (order === 'asc' ? 1 : 0) + column
