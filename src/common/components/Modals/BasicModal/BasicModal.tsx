import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { ActonIconButton } from '../../../../features/cardsPack/components/cardPack/ActonIconButton'
import { ReactComponent as EditSVG } from '../../../assets/icons/edit.svg'
import { FilledButton } from '../../FilledButton'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type PropsType = {
  children: React.ReactNode
  title: string
  callback: () => void
  closeModal?: () => void
  icon?: JSX.Element
  buttonName: string
  buttonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

export const BasicModal = (props: PropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    props.closeModal && props.closeModal()
  }

  const modalActionButton = () => {
    props.callback()
    handleClose()
  }

  return (
    <div>
      {props.icon ? (
        <ActonIconButton title="edit pack" onClick={handleOpen}>
          {props.icon}
        </ActonIconButton>
      ) : (
        <Button variant={'contained'} onClick={handleOpen}>
          {props.title}
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {props.title}
            <Button variant={'text'} onClick={handleClose}>
              x
            </Button>
          </Typography>
          {props.children}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <Typography style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant={'contained'} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant={'contained'}
              color={props.buttonColor ? props.buttonColor : 'primary'}
              onClick={modalActionButton}
            >
              {props.buttonName}
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
