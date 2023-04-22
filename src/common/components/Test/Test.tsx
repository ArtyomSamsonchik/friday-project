import React, { memo, useEffect, useState } from 'react'

import { GetCardsResponse } from '../../../features/cards/cards-api'
import { selectAllCards } from '../../../features/cards/cards-selectors'
import { setCards } from '../../../features/cards/cards-slice'
import { QuestionCard } from '../../../features/cards/components/QuestionCard'
import { CardPackType, GetCardPackResponse } from '../../../features/cardsPack/card-packs-api'
import {
  selectAllPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
} from '../../../features/cardsPack/cards-pack-selectors'
import {
  cleanPacks,
  fetchCardPacksTC,
  setCardPacks,
} from '../../../features/cardsPack/cards-pack-slice'
import { CardPack } from '../../../features/cardsPack/components/cardPack/CardPack'
import { selectProfile } from '../../../features/profile/profile-slice'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import commonS from '../../styles/common.module.css'
import { CardsContainer } from '../CardsContainer'
import { CustomContainer } from '../CustomContainer'
import { FilledButton } from '../FilledButton'
import { OutlinedButton } from '../OutlinedButton'
import { RangeSlider } from '../RangeSlider'
import { SuperButton } from '../shared/SuperButton/SuperButton'
import { SuperCheckbox } from '../shared/SuperCheckbox/SuperCheckbox'
import { SuperInputText } from '../shared/SuperInputText/SuperInputText'
import { SuperRadio } from '../shared/SuperRadio/SuperRadio'
import { SuperSelect } from '../shared/SuperSelect/SuperSelect'

import s from './Test.module.css'

export const Test = memo(() => {
  const options = ['x', 'y', 'z']
  const [selected, setSelected] = useState(options[1])
  const packs = useAppSelector(selectAllPacks)
  const cards = useAppSelector(selectAllCards)
  const profile = useAppSelector(selectProfile)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const dispatch = useAppDispatch()
  const [isMyPack, setIsMyPack] = useState(false)
  const [showNew, setShowNew] = useState(true)
  const [values, setValues] = useState([0, 110])

  //set test pack in store
  useEffect(() => {
    const pack = {
      _id: '1',
      private: false,
      user_id: '1',
      type: 'pack',
      user_name: 'test user',
      cardsCount: 1,
      updated: '',
      name: 'test name',
    } as CardPackType

    const packsResponse = {
      cardPacks: [pack],
      page: 1,
      pageCount: 12,
      minCardsCount: 1,
      maxCardsCount: 50,
    } as GetCardPackResponse

    const cards = {
      cards: [
        {
          _id: '1',
          question: "Who's bad?",
          answer: 'Michael',
          rating: 3,
          cardsPack_id: '1',
        },
      ],
      packUserId: profile._id,
    } as GetCardsResponse

    dispatch(setCardPacks(packsResponse))
    dispatch(setCards(cards))

    return () => {
      dispatch(cleanPacks())
    }
  }, [])

  const handleFetchPacksClick = () => {
    dispatch(cleanPacks())
    dispatch(
      fetchCardPacksTC({
        min: values[0],
        max: values[1],
        sortPacks: showNew ? '0updated' : '1updated',
        user_id: isMyPack ? profile._id : '',
      })
    )
  }

  return (
    <div className={commonS.demo}>
      <h1>Super components demo</h1>
      <h3>Super button</h3>
      <div className={s.container}>
        <FilledButton onClick={handleFetchPacksClick}>load packs for test</FilledButton>
        <FilledButton disabled>disabled</FilledButton>
        <OutlinedButton>button</OutlinedButton>
      </div>
      <div>
        <SuperButton
          style={isMyPack ? { backgroundColor: 'blue' } : { backgroundColor: 'white' }}
          onClick={() => setIsMyPack(true)}
        >
          my
        </SuperButton>
        <SuperButton
          style={isMyPack ? { backgroundColor: 'white' } : { backgroundColor: 'blue' }}
          onClick={() => setIsMyPack(false)}
        >
          all
        </SuperButton>
      </div>
      <SuperButton style={{ backgroundColor: 'blue' }} onClick={() => setShowNew(!showNew)}>
        {showNew ? 'show old' : 'show new'}
      </SuperButton>
      <RangeSlider
        minValueLimit={minCardsCount}
        maxValueLimit={maxCardsCount}
        onRangeChangeCommit={(min, max) => setValues([min, max])}
      />
      <h3>Cards</h3>
      <CustomContainer>
        <CardsContainer>
          {packs.length &&
            packs.map(p => (
              <CardPack
                key={p._id}
                packId={p._id}
                onOpenCardPack={() => {
                  alert('opened pack')
                }}
                onDeleteCardPack={() => {
                  alert('deleted pack')
                }}
                onEditCardPack={() => {
                  alert('edited pack')
                }}
              />
            ))}
          {cards.length &&
            cards.map(c => (
              <QuestionCard
                key={c._id}
                cardId={c._id}
                onEditCard={() => alert('card edited')}
                onDeleteCard={() => alert('card deleted')}
              />
            ))}
        </CardsContainer>
      </CustomContainer>
      <h3>Super checkbox</h3>
      <div className={s.container}>
        <SuperCheckbox />
        <SuperCheckbox />
        <SuperCheckbox />
      </div>
      <h3>Super select</h3>
      <div className={s.container}>
        <SuperSelect options={options} value={selected} onChangeOption={setSelected} />
      </div>
      <h3>Super radio</h3>
      <div className={s.container}>
        <SuperRadio name="radio" options={options} value={selected} onChangeOption={setSelected} />
      </div>
      <h3>Super input</h3>
      <div className={s.container}>
        <SuperInputText placeholder="Input some text" />
      </div>
    </div>
  )
})
