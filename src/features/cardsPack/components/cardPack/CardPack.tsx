import React, { FC, memo } from 'react'

import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

import { ReactComponent as DeleteSVG } from '../../../../common/assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../../common/assets/icons/edit.svg'
import { ReactComponent as TeacherSVG } from '../../../../common/assets/icons/teacher.svg'
import { CustomCard } from '../../../../common/components/CustomCard'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { selectProfile } from '../../../profile/profile-slice'
import { CardPackType } from '../../card-packs-api'
import { selectCardPack } from '../../cards-pack-selectors'

import { ActionButtonsContainer } from './ActionButtonsContainer'
import { ActonIconButton } from './ActonIconButton'

type CardPackProps = {
  packId: string
  onOpenCardPack: (packId: string) => void
  onEditCardPack: (packId: string) => void
  onDeleteCardPack: (packId: string) => void
}

//image src placeholder
const globalImageSrc = 'https://tomaztsql.files.wordpress.com/2021/01/cards.png'

export const CardPack: FC<CardPackProps> = memo(props => {
  const { packId, onOpenCardPack, onEditCardPack, onDeleteCardPack } = props

  const pack = useAppSelector(state => selectCardPack(state, packId)) as CardPackType
  const profile = useAppSelector(selectProfile)

  const isMyPack = profile._id === pack.user_id
  const lastUpdated = dayjs(pack.updated).format('DD.MM.YYYY HH:mm')

  return (
    <CustomCard sx={{ minHeight: '200px' }}>
      <CardMedia
        sx={{ height: 150, backgroundSize: 'cover' }}
        image={pack.deckCover || globalImageSrc}
      />
      <ActionButtonsContainer sx={{ position: 'absolute', top: '12px', right: '12px' }}>
        <ActonIconButton
          disabled={pack.cardsCount === 0}
          onClick={() => onOpenCardPack(packId)}
          title="open pack"
        >
          <TeacherSVG />
        </ActonIconButton>
        <ActonIconButton
          isHidden={!isMyPack}
          onClick={() => onEditCardPack(packId)}
          title="edit pack"
        >
          <EditSVG />
        </ActonIconButton>
        <ActonIconButton
          isHidden={!isMyPack}
          onClick={() => onDeleteCardPack(packId)}
          title="delete pack"
        >
          <DeleteSVG />
        </ActonIconButton>
      </ActionButtonsContainer>
      <CardContent sx={{ wordWrap: 'break-word' }}>
        <Typography variant="h5">{pack.name}</Typography>
        <Typography>Last updated: {lastUpdated}</Typography>
        <Typography>Total cards: {pack.cardsCount}</Typography>
        <Typography>Creator: {pack.user_name}</Typography>
      </CardContent>
    </CustomCard>
  )
})

// TODO: remove card pack image placeholder later
// TODO: add time formatted helper for last updated card field
