import React from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import s from './CustomPaperContainer.module.css'

type CustomPaperContainerPropsType = {
  children: React.ReactNode
}
export const CustomPaperContainer: React.FC<CustomPaperContainerPropsType> = props => {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item justifyContent={'center'}>
        <Paper variant={'outlined'} className={s.paper}>
          {props.children}
        </Paper>
      </Grid>
    </Grid>
  )
}
