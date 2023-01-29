import { RootStateType } from '../app/store'
import { GetCardPacksQueryParams } from '../features/cardsPack/card-packs-api'

export const mapStateToPacksRequestParams = (state: RootStateType) => {
  const {
    profile: {
      userData: { _id },
    },
    packs: {
      minCardsCount,
      maxCardsCount,
      currentPage,
      itemsPerPage,
      packSearchName,
      loadPersonalPacks,
      packsSortOrder,
    },
  } = state

  return {
    packName: packSearchName || undefined,
    min: minCardsCount,
    max: maxCardsCount,
    sortPacks: packsSortOrder,
    page: currentPage,
    pageCount: itemsPerPage,
    user_id: loadPersonalPacks ? _id : undefined,
  } as GetCardPacksQueryParams
}
