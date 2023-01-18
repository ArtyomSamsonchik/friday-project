import { RootStateType } from '../app/store'

export const selectCardPacksTotalCount = (state: RootStateType) =>
  state.cardPacks.cardPacksTotalCount
export const selectItemsPerPage = (state: RootStateType) => state.cardPacks.itemsPerPage
export const selectCurrentPage = (state: RootStateType) => state.cardPacks.currentPage
