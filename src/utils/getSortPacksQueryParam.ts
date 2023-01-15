import { SortPacksParams } from '../features/cardsPack/cards-pack-api'

//Use this function to get sortPacks query parameter for cardsApi
export const getSortPacksQueryParam = ({ order, column }: SortPacksParams) =>
  ({
    sortPacks: (order === 'asc' ? 1 : 0) + column,
  } as const)
