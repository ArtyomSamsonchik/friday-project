import React, { useCallback } from 'react'

import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import Box from '@mui/material/Box'

import { PATH } from '../../../../app/path'
import { BackLink } from '../../../../common/components/BackLink'
import { CustomContainer } from '../../../../common/components/CustomContainer'
import { CustomPaper } from '../../../../common/components/CustomPaper'
import { LoadingBackdrop } from '../../../../common/components/LoadingBackdrop/LoadingBackdrop'
import { OutlinedButton } from '../../../../common/components/OutlinedButton'
import { getUserNameInitials } from '../../../../utils/helpers/getUserNameInitials'
import { profileIsNotLoaded } from '../../../../utils/helpers/profileIsNotLoaded'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import {
  closeSession,
  fetchUpdatedProfile,
  selectProfile,
  selectProfileStatus,
} from '../../profile-slice'
import {
  ProfileAvatar,
  ProfileContainer,
  ProfileEmail,
  ProfileHeader,
  ProfileInner,
} from '../../styled'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { PhotoIconButton } from '../PhotoIconButton/PhotoIconButton'

export const Profile = () => {
  const profile = useAppSelector(selectProfile)
  const profileStatus = useAppSelector(selectProfileStatus)

  const dispatch = useAppDispatch()

  const profileControlsDisabled = profileIsNotLoaded(profile)

  const changeProfileName = useCallback((name: string) => {
    dispatch(fetchUpdatedProfile({ name }))
  }, [])

  const handleLogout = () => dispatch(closeSession())

  const handleLoadAvatar = (avatar: string) => {
    dispatch(fetchUpdatedProfile({ avatar }))
  }

  return (
    <CustomContainer sx={{ display: 'flex', flexDirection: 'column' }}>
      <BackLink title="test link to card packs" to={`/${PATH.PACKS}`} />

      <ProfileContainer>
        <CustomPaper sx={{ position: 'relative' }}>
          <LoadingBackdrop
            open={profileStatus === 'loading'}
            progressProps={{ size: 50, thickness: 4 }}
          />
          <ProfileInner>
            <ProfileHeader>Personal Information</ProfileHeader>
            <Box position={'relative'} mb={1.5}>
              <ProfileAvatar src={profile.avatar}>
                {getUserNameInitials(profile.name)}
              </ProfileAvatar>
              <PhotoIconButton onFileUpload={handleLoadAvatar} disabled={profileControlsDisabled} />
            </Box>

            <EditableSpan disabled={profileControlsDisabled} changeTitle={changeProfileName}>
              {profile.name}
            </EditableSpan>
            <ProfileEmail>{profile.email}</ProfileEmail>
            <OutlinedButton disabled={profileControlsDisabled} onClick={handleLogout}>
              <LogoutOutlined sx={{ fontSize: '1.3rem', opacity: 1 }} />
              log out
            </OutlinedButton>
          </ProfileInner>
        </CustomPaper>
      </ProfileContainer>
    </CustomContainer>
  )
}

//TODO: add adaptive layout to typography to embed user name
//TODO: add custom breakpoint to theme object: 413px ?
//TODO: add custom shadows to theme object
//TODO: add Montseratt font to theme object
//TODO: rename test link
