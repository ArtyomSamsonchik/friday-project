import React from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../app/path'
import emailImage from '../../../assets/icons/email.svg'
import common from '../../../styles/common.module.css'
import { CustomPaperContainer } from '../../CustomPaperContainer/CustomPaperContainer'

import s from './CheckEmail.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const redirectToLoginHandler = () => {
    navigate(`/${PATH.LOGIN}`)
  }

  return (
    <CustomPaperContainer>
      <Card className={s.card}>
        <CardContent sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Typography
            gutterBottom
            component="h3"
            align={'center'}
            style={{ fontSize: '26px', fontWeight: '600' }}
          >
            Check Email
          </Typography>
          <CardMedia sx={{ height: 108, backgroundSize: 'initial' }} image={emailImage} />
          <Typography variant="body2" color="text.secondary" align={'center'}>
            We’ve sent an Email with instructions to <br /> example@mail.com
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={redirectToLoginHandler}
            variant="contained"
            size="small"
            fullWidth
            className={common.submitBtn}
            sx={{
              color: '#fff',
            }}
          >
            Back to login
          </Button>
        </CardActions>
      </Card>
    </CustomPaperContainer>
  )
}

// TODO: add click handler with navigate
