import { RootStateType } from '../app/store'
import { GetCardPacksQueryParams } from '../features/cardsPack/card-packs-api'

export const getFetchCardPacksQueryParams = (state: RootStateType) => {
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
      sortPacksOrder,
    },
  } = state

  return {
    packName: packSearchName || undefined,
    min: minCardsCount,
    max: maxCardsCount,
    sortPacks: sortPacksOrder,
    page: currentPage,
    pageCount: itemsPerPage,
    user_id: loadPersonalPacks ? _id : undefined,
  } as GetCardPacksQueryParams
}
