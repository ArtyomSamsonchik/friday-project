import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

import { BasicModal } from '../BasicModal/BasicModal'

type PropsType = {
  handleLoadPacksClick: (name: string) => void
}

export const AddPackModal = (props: PropsType) => {
  const [packTitle, SetPackTitle] = useState('')
  const callback = () => {
    props.handleLoadPacksClick(packTitle)
    SetPackTitle('')
  }

  const packTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    SetPackTitle(e.currentTarget.value)
  }

  return (
    <BasicModal callBack={callback} title={'add new pack'}>
      <input value={packTitle} onChange={packTitleChange}></input>
    </BasicModal>
  )
}
