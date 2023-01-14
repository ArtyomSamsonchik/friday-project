import React from 'react'

import { Avatar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/path'
import { selectIsLoggedIn } from '../../../features/auth/auth-slice'
import { selectProfile } from '../../../features/profile/profile-slice'
import { getUserNameInitials } from '../../../utils/getUserNameInitials'
import { useAppSelector } from '../../../utils/hooks'

import s from './Header.module.css'

export const Header = () => {
  const profile = useAppSelector(selectProfile)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const navigate = useNavigate()
  const handleSignIn = () => {
    navigate(`/${PATH.LOGIN}`)
  }

  // Temporary construction. For development.
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={'inherit'}>
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
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: '1.1rem',
                  overflow: 'visible',
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
      <ul className={s.links_list}>{links}</ul>
    </Box>
  )
}
