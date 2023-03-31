import { RootStateType } from '../../app/store'

export const selectPacksSlice = (state: RootStateType) => state.packs
export const selectAllPacks = (state: RootStateType) => selectPacksSlice(state).cardPacks
export const selectAllPacksIds = (state: RootStateType) => selectAllPacks(state).map(p => p._id)
export const selectCardPack = (state: RootStateType, id: string) => {
  return selectAllPacks(state).find(p => p._id === id)
}
export const selectPackSearchName = (state: RootStateType) => selectPacksSlice(state).packSearchName
export const selectCurrentPage = (state: RootStateType) => selectPacksSlice(state).currentPage
export const selectItemsPerPage = (state: RootStateType) => selectPacksSlice(state).itemsPerPage
export const selectPacksSortOrder = (state: RootStateType) => selectPacksSlice(state).packsSortOrder
export const selectIsMyPacks = (state: RootStateType) => selectPacksSlice(state).loadPersonalPacks
export const selectMinCardsCount = (state: RootStateType) => selectPacksSlice(state).minCardsCount
export const selectMaxCardsCount = (state: RootStateType) => selectPacksSlice(state).maxCardsCount
export const selectPacksTotalCount = (state: RootStateType) =>
  selectPacksSlice(state).cardPacksTotalCount
export const selectPacksStatus = (state: RootStateType) => selectPacksSlice(state).status
