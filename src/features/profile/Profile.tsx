import React, { ChangeEvent, useCallback } from 'react'

import { LogoutOutlined } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'

import { PATH } from '../../app/path'
import { BackLink } from '../../common/components/BackLink'
import { CustomContainer } from '../../common/components/CustomContainer'
import { CustomPaper } from '../../common/components/CustomPaper'
import { OutlinedButton } from '../../common/components/OutlinedButton'
import { convertFileToBase64 } from '../../utils/helpers/convertFileToBase64'
import { getUserNameInitials } from '../../utils/helpers/getUserNameInitials'
import { profileIsNotLoaded } from '../../utils/helpers/profileIsNotLoaded'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import { EditableSpan } from './EditableSpan/EditableSpan'
import { PhotoIconButton } from './PhotoIconButton'
import { closeSession, fetchUpdatedProfile, selectProfile } from './profile-slice'

export const Profile = () => {
  let profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  /*const avatar = useAppSelector(state => state.profile.userData.avatar)*/
  const profileControlsDisabled = profileIsNotLoaded(profile)
  const changeProfileName = useCallback((name: string) => {
    dispatch(fetchUpdatedProfile({ name }))
  }, [])

  const handleLogoutClick = () => {
    dispatch(closeSession())
  }

  console.log(profile.avatar)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(fetchUpdatedProfile({ avatar: file64 }))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <CustomContainer>
      <BackLink title="test link to card packs" to={`/${PATH.PACKS}`} />
      <CustomPaper
        sx={{
          maxWidth: '413px',
          mx: 'auto',
          animation: ({ transitions }) => `0.4s slide-up ${transitions.easing.easeInOut}`,
        }}
      >
        <Box px={4} pt="24px" pb="44px" display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h3"
            sx={{ fontSize: 22, lineHeight: 1.2, fontWeight: 600, mb: '30px' }}
          >
            Personal Information
          </Typography>
          <Box position={'relative'}>
            <Avatar
              alt="user"
              variant={'circular'}
              src={profile.avatar}
              sx={{
                mb: 1,
                width: 110,
                height: 110,
                fontSize: '2.1rem',
              }}
            >
              {getUserNameInitials(profile.name)}
            </Avatar>
            <PhotoIconButton onFileUpload={uploadHandler} disabled={profileControlsDisabled} />
          </Box>

          <EditableSpan disabled={profileControlsDisabled} changeTitle={changeProfileName}>
            {profile.name}
          </EditableSpan>
          <Typography
            variant="body1"
            sx={{ fontSize: '14px', lineHeight: 1.7, opacity: 0.5, mb: 3.5 }}
          >
            {profile.email}
          </Typography>
          <OutlinedButton disabled={profileControlsDisabled} onClick={handleLogoutClick}>
            <LogoutOutlined sx={{ fontSize: '1.3rem', opacity: 1 }} />
            log out
          </OutlinedButton>
        </Box>
      </CustomPaper>
    </CustomContainer>
  )
}

//TODO: add redirect to login if not logged in
//TODO: add adaptive layout
//TODO: add custom breakpoint to theme object: 413px ?
//TODO: add custom shadows to theme object
//TODO: add Montseratt font to theme object
