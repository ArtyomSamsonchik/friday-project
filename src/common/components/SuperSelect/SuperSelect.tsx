import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from "./SuperSelect.module.css"

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType<T> = DefaultSelectPropsType & {
    options?: T[]
    onChangeOption?: (option: T) => void
}

function SuperSelect<T extends string | number = string>(props: SuperSelectPropsType<T>) {
    const {options, onChange, onChangeOption, className, ...restProps} = props
    const mappedOptions = options
        ? options.map((el, i) => <option key={el + "-" + i} value={el}>{el}</option>)
        : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value as T)
    }

    const finalSelectName = `${s.selectContainer} ${className ? className : ""}`

    return (
        <div className={finalSelectName}>
            <select onChange={onChangeCallback} {...restProps}>
                {mappedOptions}
            </select>
            <div className={s.arrow}></div>
        </div>
    )
}

export default SuperSelect
