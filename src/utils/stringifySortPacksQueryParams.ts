import { SortPacksParams } from '../features/cardsPack/card-packs-api'

//Use this function to get sortPacks query parameter for cardsApi
export const stringifySortPacksQueryParams = ({ order, column }: SortPacksParams) =>
  (order === 'asc' ? 1 : 0) + column
