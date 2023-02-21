import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { selectCardsTotalCount } from '../../../features/cards/cards-selectors'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import commonS from '../../styles/common.module.css'

export const EmptyPackPage = () => {
  const cardsTotalCount = useAppSelector(selectCardsTotalCount)
  const navigate = useNavigate()
  const { packId } = useParams()

  console.log(cardsTotalCount)
  useEffect(() => {
    console.log('empty')
    if (cardsTotalCount) {
      navigate(`/${PATH.CARDS}/${packId}`)
    }
  }, [cardsTotalCount])

  return (
    <div className={commonS.demo}>
      <h1>this pack is empty</h1>
      <h1>but you can add some card</h1>
      <button>add card</button>
    </div>
  )
}
