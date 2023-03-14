import { instance } from '../../app/api-instance'
import { ResponseTokenData } from '../cardsPack/card-packs-api'

export const cardsApi = {
  getCards(params: GetCardsQueryParams) {
    return instance.get<GetCardsResponse>('cards/card', { params })
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
  updateCardGrade(data: UpdateCardGradeRequestData) {
    return instance.put<UpdateCardGradeResponse>('/cards/grade', data)
  },
}

export type GetCardsQueryParams = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type AddCardRequestData = {
  cardsPack_id: string
  // grade?: number
  // shots?: number
} & CardMutationData

export type UpdateCardRequestData = {
  _id: string
} & CardMutationData

export type CardMutationData = {
  question: string | 'no question'
  answer: string | 'no answer'
  questionImg?: string | 'no question image'
  answerImg?: string | 'no answer image'
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardGradeRequestData = { card_id: string; grade: number }

export type UpdateCardGradeResponse = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}

export type Card = {
  _id: string
  answer: string | 'no answer'
  question: string | 'no question'
  answerImg?: string
  questionImg?: string
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

export type SortCardsParams = {
  order: 'asc' | 'desc'
  column: 'grade' | 'question' | 'answer' | 'updated'
}

export type GetCardsResponse = {
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

export type AddCardResponse = { newCard: Card } & ResponseTokenData
export type DeleteCardResponse = { deletedCard: Card } & ResponseTokenData
export type UpdateCardResponse = { updatedCard: Card } & ResponseTokenData

// TODO: add sortCards helper to create according query param
// TODO: reduce AddCardRequestData type in future. grade and shots are unnecessary
