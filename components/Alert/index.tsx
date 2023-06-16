'use client'

import { type FC } from 'react'

interface Props {
  message: string
}

const Alert: FC<Props> = ({ message }) => {
  alert(message)
  window.location.reload()

  return <></>
}

export default Alert
