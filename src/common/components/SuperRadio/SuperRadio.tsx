import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from "./SuperRadio.module.css"

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    spanClassName?: string
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        className, spanClassName,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const finalLabelClassName = `${s.superRadio} ${className ? className : ""}`
    const finalSpanClassName = `${s.span} ${spanClassName ? spanClassName : ""}`

    const mappedOptions: any[] = options ? options.map((o, i) => ( // map options with key
        <label key={name + '-' + i} className={finalLabelClassName}>
            <input
                type={'radio'}
                name={name}
                checked={o === value}
                value={o}
                onChange={onChangeCallback}
                {...restProps}  //???????????????? надо ли?
            />
            <span className={finalSpanClassName}>{o}</span>
        </label>
    )) : []

    return (
        <>{mappedOptions}</>
    )
}

export default SuperRadio
