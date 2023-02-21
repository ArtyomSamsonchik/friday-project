import React from 'react'

import commonS from '../../styles/common.module.css'
import { CustomContainer } from '../CustomContainer'

export const ErrorPage = () => {
  return (
    <CustomContainer>
      <div className={commonS.demo}>
        <h1>404 Page Not Found</h1>
      </div>
    </CustomContainer>
  )
}
