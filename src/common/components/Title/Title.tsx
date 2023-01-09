import React from 'react'

type PropsType = {
  title: string
}

export const Title = (props: PropsType) => {
  return <div style={{ marginTop: '20px', marginBottom: '30px' }}>{props.title}</div>
}
