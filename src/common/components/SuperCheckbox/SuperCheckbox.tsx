import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from './SuperCheckbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
  type,
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeChecked?.(e.currentTarget.checked)
  }

  const finalLabelClassName = `${s.superCheckbox} ${className ? className : ''}`
  const finalSpanClassName = `${s.span} ${spanClassName ? spanClassName : ''}`

  return (
    <label className={finalLabelClassName}>
      <input type={'checkbox'} onChange={onChangeCallback} {...restProps} />
      <span className={finalSpanClassName}>{children}</span>
    </label>
  )
}

export default SuperCheckbox
