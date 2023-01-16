import React from 'react'

import { Outlet } from 'react-router-dom'

import { CustomContainer } from './CustomContainer'

export const CardsLayout = () => {
  return (
    <CustomContainer>
      {/*Button, back-link, header are here*/}
      {/*Outlet will contain container with card packs / single cards*/}
      <Outlet />
      {/*Pagination bar is here*/}
    </CustomContainer>
  )
}
