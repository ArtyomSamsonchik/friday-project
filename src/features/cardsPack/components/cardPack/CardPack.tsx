import React, { FC, memo, MouseEventHandler } from 'react'

import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { ReactComponent as DeleteSVG } from '../../../../common/assets/icons/delete.svg'
import { ReactComponent as EditSVG } from '../../../../common/assets/icons/edit.svg'
import { ReactComponent as TeacherSVG } from '../../../../common/assets/icons/teacher.svg'
import { CustomCard } from '../../../../common/components/CustomCard'
import { DeletePackModal } from '../../../../common/components/Modals/DeletePackModal/DeletePackModal'
import { EditPackModal } from '../../../../common/components/Modals/EditPackModal/EditPackModal'
import { useAppDispatch } from '../../../../utils/hooks'
import { AddPackData } from '../../card-packs-api'
import { deleteCardPackTC, updateCardPackTC } from '../../cards-pack-slice'

import { ActionButtonsContainer } from './ActionButtonsContainer'
import { ActonIconButton } from './ActonIconButton'

type CardPackProps = {
  packName: string
  totalCards: number
  lastUpdated: string
  creator: string
  isMyPack: boolean
  imageSrc?: string
  packId: string
  openCardPack?: MouseEventHandler<HTMLButtonElement>
  editCardPack?: MouseEventHandler<HTMLButtonElement>
  deleteCardPack?: MouseEventHandler<HTMLButtonElement>
}

//image src placeholder
const globalImageSrc = 'https://tomaztsql.files.wordpress.com/2021/01/cards.png'

export const CardPack: FC<CardPackProps> = memo(props => {
  const { packName, creator, lastUpdated, totalCards, isMyPack, imageSrc, openCardPack, packId } =
    props
  const dispatch = useAppDispatch()
  const editCardPack = (data: AddPackData) => {
    dispatch(updateCardPackTC(data))
  }
  const deleteCardPack = (packId: string) => {
    dispatch(deleteCardPackTC(packId))
  }

  return (
    <CustomCard sx={{ minHeight: '200px' }}>
      <CardMedia sx={{ height: 150, backgroundSize: 'cover' }} image={imageSrc || globalImageSrc} />
      <ActionButtonsContainer sx={{ position: 'absolute', top: '12px', right: '12px' }}>
        <ActonIconButton disabled={totalCards === 0} onClick={openCardPack} title="open pack">
          <TeacherSVG />
        </ActonIconButton>
        {isMyPack ? (
          <EditPackModal
            editCardPack={editCardPack}
            packId={packId}
            packName={packName}
            icon={<EditSVG />}
          />
        ) : (
          ''
        )}{' '}
        {isMyPack ? (
          <DeletePackModal
            deleteCardPack={deleteCardPack}
            packId={packId}
            packName={packName}
            icon={<DeleteSVG />}
          />
        ) : (
          ''
        )}
      </ActionButtonsContainer>
      <CardContent sx={{ wordWrap: 'break-word' }}>
        <Typography variant="h5">{packName}</Typography>
        <Typography>Last updated: {lastUpdated}</Typography>
        <Typography>Total cards: {totalCards}</Typography>
        <Typography>Creator: {creator}</Typography>
      </CardContent>
    </CustomCard>
  )
})

// TODO: remove card pack image placeholder later
// TODO: add time formatted helper for last updated card field
