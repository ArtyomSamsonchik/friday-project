import { RootStateType } from '../../app/store'

import { Card } from './cards-api'

const selectCardsSlice = (state: RootStateType): RootStateType['cards'] => state.cards

export const selectAllCards = (state: RootStateType) => selectCardsSlice(state).cards
export const selectCard = (state: RootStateType, id: string) => {
  return selectAllCards(state).find(c => c._id === id) as Card
}
export const selectPackName = (state: RootStateType) => selectCardsSlice(state).packName
export const selectCardSearchName = (state: RootStateType) => selectCardsSlice(state).cardSearchName
export const selectCardSortOrder = (state: RootStateType) => selectCardsSlice(state).cardsSortOrder
export const selectPackIsPrivate = (state: RootStateType) => selectCardsSlice(state).packIsPrivate
export const selectCardsCurrentPage = (state: RootStateType) => selectCardsSlice(state).page
export const selectCardItemsPerPage = (state: RootStateType) => selectCardsSlice(state).pageCount
export const selectCardsTotalCount = (state: RootStateType) =>
  selectCardsSlice(state).cardsTotalCount

export const selectCardsUserId = (state: RootStateType) => selectCardsSlice(state).packUserId
