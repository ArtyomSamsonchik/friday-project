import * as React from 'react'
import { ReactNode } from 'react'

import { ButtonProps } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { ActonIconButton } from '../../../../features/cardsPack/components/cardPack/ActonIconButton'
import { FilledButton } from '../../FilledButton'

type PropsType = {
  children: ReactNode
  title: string
  callback: () => void
  closeModal?: () => void
  icon?: JSX.Element
  buttonName: string
  handleOpen?: () => void
  buttonColor?: ButtonProps['color']
}

export const BasicModal = (props: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    props.handleOpen?.()
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    props.closeModal?.()
  }

  const modalActionButton = () => {
    props.callback()
    handleClose()
  }

  return (
    <>
      {props.icon ? (
        <ActonIconButton title="edit pack" onClick={handleOpen}>
          {props.icon}
        </ActonIconButton>
      ) : (
        <FilledButton sx={{ px: 4.5 }} onClick={handleOpen}>
          {props.title}
        </FilledButton>
      )}
      <Modal
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        open={open}
        onClose={handleClose}
      >
        <Box px={3} width={1} maxWidth={400} boxSizing="content-box">
          <Box
            p={4}
            border="2px solid #000"
            sx={{ backgroundColor: 'background.paper', boxShadow: 24 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography component="h2" variant="h6">
                {props.title}
              </Typography>
              <Button variant={'text'} onClick={handleClose}>
                x
              </Button>
            </Box>
            {props.children}

            <Box display="flex" justifyContent="space-between">
              <Button variant={'contained'} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant={'contained'} color={props.buttonColor} onClick={modalActionButton}>
                {props.buttonName}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
