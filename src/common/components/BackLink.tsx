import React, { FC } from 'react'

import { styled } from '@mui/material'
import { Link, LinkProps } from 'react-router-dom'

import { ReactComponent as ArrowBack } from '../assets/icons/arrow-back.svg'

type BackLinkProps = Omit<LinkProps, 'children'> & { title: string }

const component: FC<BackLinkProps> = ({ title, ...props }) => (
  <Link {...props}>
    <>
      <ArrowBack />
      <span>{title}</span>
    </>
  </Link>
)

export const BackLink = styled(component, { name: 'BackLink' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(2),
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(3.5),
  },
}))
