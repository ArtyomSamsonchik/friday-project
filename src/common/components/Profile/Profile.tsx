import React, { useEffect } from 'react'

import { Avatar, Box, Container, Paper, Typography } from '@mui/material'

import { User } from '../../../features/auth/auth-api'
import { fetchProfile } from '../../../features/auth/auth-slice'
import { selectProfile } from '../../../features/profile/profile-slice'
import { getUserNameInitials } from '../../../utils/getUserNameInitials'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

export const Profile = () => {
  //TODO: think about User | null flow
  const profile = useAppSelector(selectProfile) as User
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!profile) {
      const email = process.env.REACT_APP_EMAIL as string
      const password = process.env.REACT_APP_PASSWORD as string

      dispatch(fetchProfile(email, password))
    }
  }, [])

  console.log(profile)

  return (
    <Container maxWidth={'xs'}>
      <Paper elevation={1} square>
        <Box px={4} pt="24px" pb="44px" display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h3" sx={{ fontSize: 22, lineHeight: 1.2, fontWeight: 600 }}>
            Profile
          </Typography>
          <Avatar alt="user" sx={{ width: 96, height: 96, fontSize: 48 }}>
            {getUserNameInitials(profile?.name || '')}
          </Avatar>
          <Typography variant="body1">{profile?.name || ''}</Typography>
          <Typography variant="body1" sx={{ opacity: 0.5 }}>
            {profile?.email || ''}
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

//TODO: add redirect to login if not logged in
//TODO: add adaptive layout
//TODO: add custom breakpoint to theme object: 413px ?
//TODO: add custom shadows to theme object
