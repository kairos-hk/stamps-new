'use client'

import { type FC } from 'react'
import { Button } from '../Button'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  children?: string
}

const RedirectButton: FC<Props> = ({ children }) => {
  const router = useRouter()
  const searchParam = useSearchParams()

  const onClick = (): void => {
    router.push(searchParam.get('redirect') ?? '/')
  }

  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  )
}

export default RedirectButton
