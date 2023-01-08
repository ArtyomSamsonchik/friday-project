import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = props => {
  const { red, className, ...restProps } = props
  const finalClassName = `${s.button} ${red ? s.red : s.default} ${className ? className : ''}`

  return <button className={finalClassName} {...restProps} />
}
