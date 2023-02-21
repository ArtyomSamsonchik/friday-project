import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { selectCardsTotalCount, selectCardsUserId } from '../../../features/cards/cards-selectors'
import { addCardTC } from '../../../features/cards/cards-slice'
import { selectProfile } from '../../../features/profile/profile-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import commonS from '../../styles/common.module.css'
import { BackLink } from '../BackLink'
import { CustomContainer } from '../CustomContainer'

export const EmptyPackPage = () => {
  const cardsTotalCount = useAppSelector(selectCardsTotalCount)
  const navigate = useNavigate()
  const { packId } = useParams()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const cardsUserId = useAppSelector(selectCardsUserId)

  const isMyPack = profile._id === cardsUserId

  console.log(cardsTotalCount)
  useEffect(() => {
    if (cardsTotalCount) {
      navigate(`/${PATH.CARDS}/${packId}`)
    }
  }, [cardsTotalCount])
  const addCard = () => {
    packId && dispatch(addCardTC({ cardsPack_id: packId, question: 'I', answer: 't' }))
  }

  return (
    <CustomContainer>
      <BackLink title="Back to Packs List" to={`/${PATH.PACKS}`} />
      <div className={commonS.demo}>
        <h1>this pack is empty</h1>
        {isMyPack && (
          <>
            <h1>but you can add some card</h1>
            <button onClick={addCard}>add card</button>
          </>
        )}
      </div>
    </CustomContainer>
  )
}
