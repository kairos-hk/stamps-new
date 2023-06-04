'use client'

import { useRouter } from 'next/navigation'
import { useEffect, type FC } from 'react'

const NotFound: FC = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [router])

  return <></>
}

export default NotFound
