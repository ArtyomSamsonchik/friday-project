import React, { memo, useState } from 'react'

import { QuestionCard } from '../../../features/cards/components/QuestionCard'
import {
  selectAllPacks,
  selectMaxCardsCount,
  selectMinCardsCount,
} from '../../../features/cardsPack/cards-pack-selectors'
import { DEPRECATED_fetchCardPacksTC } from '../../../features/cardsPack/cards-pack-slice'
import { CardPack } from '../../../features/cardsPack/components/cardPack/CardPack'
import { selectProfile } from '../../../features/profile/profile-slice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import commonS from '../../styles/common.module.css'
import { CardsContainer } from '../CardsContainer'
import { CustomContainer } from '../CustomContainer'
import { FilledButton } from '../FilledButton'
import { OutlinedButton } from '../OutlinedButton'
import { MinimumDistanceSlider } from '../RangeSlider'
import { SuperButton } from '../shared/SuperButton/SuperButton'
import { SuperCheckbox } from '../shared/SuperCheckbox/SuperCheckbox'
import { SuperInputText } from '../shared/SuperInputText/SuperInputText'
import { SuperRadio } from '../shared/SuperRadio/SuperRadio'
import { SuperSelect } from '../shared/SuperSelect/SuperSelect'

import s from './Test.module.css'

export const Test = memo(() => {
  const options = ['x', 'y', 'z']
  const [selected, setSelected] = useState(options[1])
  const cards = useAppSelector(selectAllPacks)
  const profile = useAppSelector(selectProfile)
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const dispatch = useAppDispatch()
  const [isMyPack, setIsMyPack] = useState(false)
  const [showNew, setShowNew] = useState(true)
  const [values, setValues] = useState([0, 110])

  const handleFetchPacksClick = () => {
    dispatch(
      DEPRECATED_fetchCardPacksTC({
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
      <MinimumDistanceSlider
        minValue={minCardsCount}
        maxValue={maxCardsCount}
        onRangeChange={(min, max) => setValues([min, max])}
      />
      <h3>Cards</h3>
      <CustomContainer>
        <CardsContainer>
          <CardPack
            isPrivate={false}
            packId={'as'} ///  что бы не ругался тест
            packName={'Test card pack'}
            totalCards={20}
            lastUpdated={'14.01.2023'}
            creator={'Artyom'}
            isMyPack={true}
            openCardPack={() => {
              alert('opened pack')
            }}
            deleteCardPack={() => {
              alert('deleted pack')
            }}
            editCardPack={() => {
              alert('edited pack')
            }}
          />
          <QuestionCard
            question={'Lorem ipsum dolor sit amet'}
            answer={'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
            isMyCard={true}
            lastUpdated="19.01.2023"
            rating={2.7}
            editCard={() => alert('card edited')}
            deleteCard={() => alert('card deleted')}
          />
          {cards.map(c => (
            <CardPack
              isPrivate={false}
              key={c._id}
              packId={c._id}
              packName={c.name}
              totalCards={c.cardsCount}
              lastUpdated={c.updated}
              creator={c.user_name}
              isMyPack={profile._id === c.user_id}
              openCardPack={() => {
                alert('opened pack')
              }}
              deleteCardPack={() => {
                alert('deleted pack')
              }}
              editCardPack={() => {
                alert('edited pack')
              }}
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
