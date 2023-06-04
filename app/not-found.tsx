'use client'

import { useRouter } from 'next/navigation'
import { type FC } from 'react'

const NotFound: FC = () => {
  const router = useRouter()
  router.push('/')

  return <></>
}

export default NotFound
