import React from 'react'

import { Avatar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { selectIsLoggedIn } from '../../../features/auth/login-selectors'
import { selectProfile } from '../../../features/profile/profile-slice'
import { getUserNameInitials } from '../../../utils/helpers/getUserNameInitials'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { ProgressBar } from '../ProgressBar'

import s from './Header.module.css'

export const Header = () => {
  const profile = useAppSelector(selectProfile)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const avatar = useAppSelector(state => state.profile.userData.avatar)
  const navigate = useNavigate()
  const handleSignIn = () => {
    navigate(`/${PATH.LOGIN}`)
  }

  // // Temporary construction. For development.
  // const pathCopy = { ...PATH }
  //
  // //@ts-ignore
  // delete pathCopy.CARDS
  // //@ts-ignore
  // pathCopy.PACKS = `${PATH.CARDS}/${PATH.PACKS}`
  const links = Object.entries(PATH).map(([name, path], i) => {
    name = name.replace('_', ' ').toLowerCase()

    return (
      <li key={'link' + i}>
        <NavLink to={path} className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
          {name}
        </NavLink>
      </li>
    )
  })

  return (
    <Box sx={{ marginBottom: '84px' }}>
      <AppBar color={'inherit'}>
        <ProgressBar />
        <Toolbar sx={{ justifyContent: 'space-between', width: '1280px', margin: '0 auto' }}>
          <div
            onClick={() => alert('"INCUBATOR" is a best education programm')}
            className={s.headerLogo}
          ></div>
          {isLoggedIn ? (
            <NavLink to={PATH.PROFILE} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography color={'black'}>{profile.name}</Typography>
              <Avatar
                alt="user"
                src={avatar}
                variant={'circular'}
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: '1.1rem',

                  marginLeft: 1,
                }}
              >
                {getUserNameInitials(profile.name)}
              </Avatar>
            </NavLink>
          ) : (
            <Button
              sx={{
                width: '113px',
                height: '36px',
                color: '#fff',
                textTransform: 'initial !important',
                backgroundColor: '#366EFF !important',
                borderRadius: '30px !important',
              }}
              variant={'contained'}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/*Temporary construction. For development.*/}
      <Box
        sx={{ position: 'fixed', bottom: 50, left: 20, zIndex: 1000, backgroundColor: '#a6a3a3cf' }}
      >
        <ul className={s.links_list}>{links}</ul>
      </Box>
    </Box>
  )
}
