'use client'

import Link from 'next/link'
import { useState, type FC, useEffect } from 'react'
import { Button } from '../Button'

const QuizScanButton: FC = () => {
  const [message, setMessage] = useState<string | undefined>('로딩중...')

  useEffect(() => {
    const timer = setInterval(() => {
      const data = window.localStorage.getItem('lastScanned')
      if (data === null) {
        setMessage(undefined)
        return
      }

      const last = parseInt(data)
      const now = new Date().getTime()
      const diff = Math.floor(300 - (now - last) / 1000)
      if (diff < 0) {
        setMessage(undefined)
        return
      }

      setMessage(`다음 기회까지 ${diff}초 남음`)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  if (message !== undefined)
    return <Button altColor disabled>{message}</Button>

  return (
    <Link href="/quizscan">
      <Button altColor>
        퀴즈 QR 스캔하기
      </Button>
    </Link>
  )
}

export default QuizScanButton
