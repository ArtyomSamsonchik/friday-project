import { instance } from '../../app/api-instance'

export const cardPacksApi = {
  getPacks(params: GetCardPacksQueryParams) {
    return instance.get<GetCardPackResponse>('cards/pack', { params })
  },
  addPack(data: AddPackData) {
    return instance.post<AddCardPackResponse>('cards/pack', { cardsPack: data })
  },
  deletePack(packId: string) {
    return instance.delete<DeleteCardPackResponse>(`cards/pack?id=${packId}`)
  },
  updatePack(data: AddPackData) {
    return instance.put<UpdateCardPackResponse>('cards/pack', { cardsPack: data })
  },
}

export type AddPackData = {
  name: string
  deckCover?: string
  private?: boolean
  _id?: string
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
} & ResponseTokenData

type AddCardPackResponse = { newCardsPack: CardPackType } & ResponseTokenData

type DeleteCardPackResponse = { deletedCardsPack: CardPackType } & ResponseTokenData
type UpdateCardPackResponse = { updatedCardsPack: CardPackType } & ResponseTokenData

export type ResponseTokenData = {
  token: string
  tokenDeathTime: number
}
