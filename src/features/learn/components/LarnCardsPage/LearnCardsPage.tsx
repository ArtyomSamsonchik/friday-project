import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useLocation, useParams } from 'react-router-dom'

import { URL_PARAMS } from '../../../../app/path'
import { BackLink } from '../../../../common/components/BackLink'
import { CustomContainer } from '../../../../common/components/CustomContainer'
import { CustomPaper } from '../../../../common/components/CustomPaper'
import { FilledButton } from '../../../../common/components/FilledButton'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { Card, cardsApi, GetCardsQueryParams } from '../../../cards/cards-api'
import { selectPackName } from '../../../cards/cards-selectors'
import { cleanCards } from '../../../cards/cards-slice'
import { RateYourSelf } from '../RateYourSelf/RateYourSelf'

export const LearnCardsPage = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [simpleCounter, setSimpleCounter] = useState(0)
  const [cards, setCards] = useState<Card[]>([])
  const packName = useAppSelector(selectPackName)
  const { packId } = useParams<typeof URL_PARAMS.PACK_ID>()
  const { state } = useLocation()

  useEffect(() => {
    if (packId) {
      getLearnCards({ cardsPack_id: packId, pageCount: state })
    }

    return () => {
      cleanCards()
    }
  }, [])

  async function getLearnCards(params: GetCardsQueryParams) {
    await cardsApi.getCards(params).then(res => {
      setCards(res.data.cards)
    })
  }

  const increaseSimpleCounter = () => {
    setSimpleCounter(count => {
      if (count === cards.length - 1) return 0
      else return count + 1
    })
    setShowAnswer(false)
  }

  //placeholder
  if (!cards.length) return null

  return (
    <CustomContainer>
      <BackLink title="Back to Cards List" to=".." relative="path" />
      <Typography
        align={'center'}
        sx={{
          fontSize: 22,
          lineHeight: 1.2,
          fontWeight: 600,
          mb: '30px',
        }}
      >
        <b>
          Learn: {packName} {`(${simpleCounter + 1}/${cards.length})`}
        </b>
      </Typography>
      <CustomPaper
        sx={{
          maxWidth: '439px',
          minHeight: '204px',
          display: 'flex',
          padding: '30px',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'maxContent',
          mx: 'auto',
          animation: ({ transitions }) => `0.4s slide-up ${transitions.easing.easeInOut}`,
        }}
      >
        <Typography align={'justify'}>
          <b>Question:</b> {cards[simpleCounter].question}
        </Typography>
        <Typography sx={{ marginTop: '30px' }} color={'grey'}>
          Количестов попыток ответа на вопрос: {cards[simpleCounter].shots}
        </Typography>

        {showAnswer && (
          <Typography align={'justify'} sx={{ marginTop: '30px' }}>
            <b>Answer: </b> {cards[simpleCounter].answer}
          </Typography>
        )}
        <Box
          sx={{
            marginTop: '30px',
            width: 'maxContent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showAnswer && (
            <RateYourSelf
              key={cards[simpleCounter]._id}
              cardId={cards[simpleCounter]._id}
              increaseSimpleCounter={increaseSimpleCounter}
            />
          )}
          {!showAnswer && (
            <FilledButton onClick={() => setShowAnswer(!showAnswer)}>show answer</FilledButton>
          )}
        </Box>
      </CustomPaper>
    </CustomContainer>
  )
}

//TODO: add redirect back in history to cards page if learning process
//  was not launched from cards page
// TODO: replace return placeholder with loading logic (like spinner)
// TODO: write logic to update cards in store after dispatching UpdateGrade thunk
