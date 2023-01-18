import { instance } from '../../app/api-instance'
import { ResponseTokenData } from '../cardsPack/card-packs-api'

export const cardsApi = {
  getCards(params: GetCardsQueryParams) {
    return instance.get<GetCardsResponse>('cards/card', {
      params: { ...params },
    })
  },
  addCard(data: AddCardRequestData) {
    return instance.post<AddCardResponse>('cards/card', { card: data })
  },
  deleteCard(cardId: string) {
    return instance.delete<DeleteCardResponse>(`cards/card?id=${cardId}`)
  },
  updateCard(data: UpdateCardRequestData) {
    return instance.put<UpdateCardResponse>('cards/card', { card: data })
  },
}

export type GetCardsQueryParams = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type AddCardRequestData = {
  cardsPack_id: string
  question: string
  answer: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardRequestData = {
  _id: string
} & Partial<Pick<Card, 'question' | 'answer' | 'grade' | 'shots'>>

export type Card = {
  _id: string
  answer: string
  question: string
  cardsPack_id: string
  user_id: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

type GetCardsResponse = {
  cards: Card[]
  packUserId: string
  packName: string
  packPrivate: boolean
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packCreated: string
  packUpdated: string
} & ResponseTokenData

type AddCardResponse = { newCard: Card } & ResponseTokenData
type DeleteCardResponse = { deletedCard: Card } & ResponseTokenData
type UpdateCardResponse = { updatedCard: Card } & ResponseTokenData

// TODO: add sortCards helper to create according query param
