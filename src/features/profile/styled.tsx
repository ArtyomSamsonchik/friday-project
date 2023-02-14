import { styled } from '@mui/material'
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import Typography, { TypographyProps } from '@mui/material/Typography'

export const ProfileContainer = styled('div', { name: 'ProfileContainer' })(({ theme }) => ({
  width: '100%',
  maxWidth: '395px',
  margin: '0 auto',
  animation: `0.4s slide-up ${theme.transitions.easing.easeInOut}`,
}))

export const ProfileInner = styled('div', { name: 'ProfileInner' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3, 2, 5.5),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))

export const ProfileHeader = styled(
  (props: TypographyProps) => <Typography variant="h3" {...props} />,
  {
    name: 'ProfileHeader',
  }
)({
  fontSize: 22,
  lineHeight: 1.2,
  fontWeight: 600,
  marginBottom: '30px',
})

export const ProfileAvatar = styled(
  (props: AvatarProps) => <Avatar alt="user" variant={'circular'} {...props} />,
  {
    name: 'ProfileAvatar',
  }
)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: 110,
  height: 110,
  fontSize: '2.1rem',
}))

export const ProfileEmail = styled(
  (props: TypographyProps) => <Typography variant="body1" {...props} />,
  {
    name: 'ProfileEmail',
  }
)({
  fontSize: 14,
  lineHeight: 1.7,
  opacity: 0.5,
  marginBottom: 30,
})
