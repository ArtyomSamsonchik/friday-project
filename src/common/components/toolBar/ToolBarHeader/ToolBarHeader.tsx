import React from 'react'

import { FilledButton } from '../../FilledButton'

import s from './ToolBarHeader.module.css'

type ToolBarHeaderPropsType = {
  title: string
  btnTitle: string
  btnOnclickHandler: () => void
}
export const ToolBarHeader = ({ title, btnTitle, btnOnclickHandler }: ToolBarHeaderPropsType) => {
  return (
    <div className={s.toolbarHeaderContainer}>
      <h3>{title}</h3>
      <FilledButton onClick={btnOnclickHandler}>{btnTitle}</FilledButton>
    </div>
  )
}
