import React, { FC, memo } from 'react'

import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { ReactComponent as DeleteSVG } from '../../../../common/assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../../common/assets/icons/edit.svg'
import { ReactComponent as TeacherSVG } from '../../../../common/assets/icons/teacher.svg'
import { CustomCard } from '../../../../common/components/CustomCard'

import { ActionButtonsContainer } from './ActionButtonsContainer'
import { ActonIconButton } from './ActonIconButton'

type CardPackProps = {
  packName: string
  totalCards: number
  lastUpdated: string
  creator: string
  imageSrc?: string
  openCardPack?: () => void
  editCardPack?: () => void
  deleteCardPack?: () => void
}

//image src placeholder
const globalImageSrc = 'https://tomaztsql.files.wordpress.com/2021/01/cards.png'

export const CardPack: FC<CardPackProps> = memo(props => {
  const {
    packName,
    creator,
    lastUpdated,
    totalCards,
    imageSrc,
    openCardPack,
    deleteCardPack,
    editCardPack,
  } = props

  return (
    <CustomCard sx={{ minHeight: '200px' }}>
      <CardMedia sx={{ height: 150, backgroundSize: 'cover' }} image={imageSrc || globalImageSrc} />
      <ActionButtonsContainer sx={{ position: 'absolute', top: '12px', right: '12px' }}>
        <ActonIconButton onClick={openCardPack} title="open pack">
          <TeacherSVG />
        </ActonIconButton>
        <ActonIconButton onClick={editCardPack} title="edit pack">
          <EditSVG />
        </ActonIconButton>
        <ActonIconButton onClick={deleteCardPack} title="delete pack">
          <DeleteSVG />
        </ActonIconButton>
      </ActionButtonsContainer>
      <CardContent>
        <Typography variant="h5">{packName}</Typography>
        <Typography>Last updated: {lastUpdated}</Typography>
        <Typography>Total cards: {totalCards}</Typography>
        <Typography>Creator: {creator}</Typography>
      </CardContent>
    </CustomCard>
  )
})

// TODO: remove card pack image placeholder later