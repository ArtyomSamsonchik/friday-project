import React, { ReactNode } from 'react'

import s from './ToolBarHeader.module.css'

type ToolBarHeaderPropsType = {
  children: ReactNode
}
export const ToolBarHeader = ({ children }: ToolBarHeaderPropsType) => {
  return <div className={s.toolbarHeaderContainer}>{children}</div>
}
