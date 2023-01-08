import React, { useState } from 'react'

import { SuperButton } from '../shared/SuperButton/SuperButton'
import { SuperCheckbox } from '../shared/SuperCheckbox/SuperCheckbox'
import { SuperInputText } from '../shared/SuperInputText/SuperInputText'
import { SuperRadio } from '../shared/SuperRadio/SuperRadio'
import { SuperSelect } from '../shared/SuperSelect/SuperSelect'

import s from './Test.module.css'

export const Test = () => {
  const options = ['x', 'y', 'z']
  const [selected, setSelected] = useState(options[1])

  return (
    <>
      <h1>Super components demo</h1>
      <h3>Super button</h3>
      <div className={s.container}>
        <SuperButton>button</SuperButton>
        <SuperButton red>red button</SuperButton>
        <SuperButton disabled>disabled</SuperButton>
      </div>
      <h3>Super checkbox</h3>
      <div className={s.container}>
        <SuperCheckbox />
        <SuperCheckbox />
        <SuperCheckbox />
      </div>
      <h3>Super select</h3>
      <div className={s.container}>
        <SuperSelect options={options} value={selected} onChangeOption={setSelected} />
      </div>
      <h3>Super radio</h3>
      <div className={s.container}>
        <SuperRadio name="radio" options={options} value={selected} onChangeOption={setSelected} />
      </div>
      <h3>Super input</h3>
      <div className={s.container}>
        <SuperInputText placeholder="Input some text" />
      </div>
    </>
  )
}
