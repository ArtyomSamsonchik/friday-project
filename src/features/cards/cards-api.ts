import { instance } from '../../app/api-instance'
import { getSortPacksQueryParam } from '../../utils/getSortPacksQueryParam'

export const cardsApi = {
  getPacks({ sortPacks, ...params }: GetCardPackQueryParams = {}) {
    let sortQueryParam = sortPacks ? getSortPacksQueryParam(sortPacks) : {}

    return instance.get<GetCardPackResponse>('cards/pack', {
      params: { ...params, ...sortQueryParam },
    })
  },
  addPack(data: AddPackData) {
    return instance.post<AddCardPackResponse>('cards/pack', { cardsPack: data })
  },
  deletePack(packId: string) {
    return instance.delete<DeleteCardPackResponse>(`cards/pack?id=${packId}`)
  },
  updatePack(_id: string, name: string) {
    return instance.put<UpdateCardPackResponse>('cards/pack', {
      cardsPack: {
        _id,
        name,
      },
    })
  },
}

type AddPackData = {
  name: string
  deckCover?: string
  private?: boolean
}

type GetCardPackQueryParams = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: SortPacksParams
  page?: number
  pageCount?: number

  user_id?: string
  block?: boolean
}

export type SortPacksParams = {
  order: 'asc' | 'desc'
  column: 'name' | 'cardsCount' | 'created' | 'updated'
}

export type CardType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  user_name: string
  private: boolean
  created: string
  updated: string
  grade: number
  deckCover?: string
  error?: string

  //useless types?
  path: string
  shots: number
  type: 'pack'
  rating: number
  more_id: string
  __v: number
}

export type GetCardPackResponse = {
  cardPacks: CardType[]
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  page: number
  pageCount: number
} & CardPackResponse

export type AddCardPackResponse = { newCardsPack: CardType } & CardPackResponse

export type DeleteCardPackResponse = { deletedCardsPack: CardType } & CardPackResponse
export type UpdateCardPackResponse = { updatedCardsPack: CardType } & CardPackResponse

export type CardPackResponse = {
  token: string
  tokenDeathTime: number
}
