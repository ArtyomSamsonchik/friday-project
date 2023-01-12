import React from 'react'

import { Link } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import emailImage from '../../../assets/email.png'
import common from '../../../styles/common.module.css'
import { CustomPaperContainer } from '../../CustomPaperContainer/CustomPaperContainer'

import s from './CheckEmail.module.css'
export const CheckEmail = () => {
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
          <Link href="#/login" underline="none" sx={{ width: '100%' }} rel={'noreferrer'}>
            <Button variant="contained" size="small" fullWidth className={common.submitBtn}>
              Back to login
            </Button>
          </Link>
        </CardActions>
      </Card>
    </CustomPaperContainer>
  )
}
