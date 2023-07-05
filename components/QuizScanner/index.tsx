'use client'
import { useState, type FC, type ComponentProps, useEffect } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type QRScannerComponentOriginal from 'react-qr-barcode-scanner'
import { Button } from '../../components/Button'
import { useRouter } from 'next/navigation'

const QRScannerComponent = dynamic<ComponentProps<typeof QRScannerComponentOriginal>>(
  async () => await import('react-qr-barcode-scanner'),
  { ssr: false }
)

const QuizScanner: FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onUpdate = (result: any): void => {
    if (result === undefined)
      return

    if (isLoading) return
    setIsLoading(true)

    const url = new URL(result)
    if (url.pathname !== '/solvequiz') {
      alert('잘못된 형식의 QR코드입니다. 다시시도해 주세요.')
      window.location.replace(location.pathname)
      return
    }

    window.localStorage.setItem('lastScanned', Date.now().toString())
    router.replace(`/solvequiz?q=${Math.random()}`)
  }

  useEffect(() => {
    const data = window.localStorage.getItem('lastScanned')
    if (data === null)
      return

    const last = parseInt(data)
    const now = new Date().getTime()
    const diff = Math.floor(300 - (now - last) / 1000)

    if (diff < 0)
      return

    alert(`${diff}초 후 다시 시도 가능합니다.`)
    router.push('/')
  }, [router])

  return (
    <main className={style.container}>
      <div className={style.camera}>
        <div className={style.guide}></div>
        <QRScannerComponent
          stopStream={isLoading}
          onUpdate={(_, result) => { onUpdate(result) }} />
      </div>

      {isLoading && (
        <div className={style.loading}>
          처리중...
        </div>
      )}

      <Link className={style.backBtn} href="/quizs">
        <Button altColor>
          돌아가기
        </Button>
      </Link>
    </main>
  )
}

export default QuizScanner
