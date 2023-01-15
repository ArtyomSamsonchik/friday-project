import { instance } from '../../app/api-instance'
import { getSortPacksQueryParam } from '../../utils/getSortPacksQueryParam'

export const cardsPackApi = {
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

export type AddPackData = {
  name: string
  deckCover?: string
  private?: boolean
}

export type GetCardPacksQueryParams = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number

  user_id?: string
  block?: boolean
}

export type SortPacksParams = {
  order: 'asc' | 'desc'
  column: 'name' | 'cardsCount' | 'created' | 'updated'
}

export type CardPackType = {
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
  cardPacks: CardPackType[]
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  page: number
  pageCount: number
} & CardPackResponse

type AddCardPackResponse = { newCardsPack: CardPackType } & CardPackResponse

type DeleteCardPackResponse = { deletedCardsPack: CardPackType } & CardPackResponse
type UpdateCardPackResponse = { updatedCardsPack: CardPackType } & CardPackResponse

type CardPackResponse = {
  token: string
  tokenDeathTime: number
}
