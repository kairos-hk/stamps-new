'use client'
import { useState, type FC, type ComponentProps } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type QRScannerComponentOriginal from 'react-qr-barcode-scanner'
import { Button } from '../../components/Button'
import { useRouter, useSearchParams } from 'next/navigation'

const QRScannerComponent = dynamic<ComponentProps<typeof QRScannerComponentOriginal>>(
  async () => await import('react-qr-barcode-scanner'),
  { ssr: false }
)

const QuizScanPage: FC = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onUpdate = async (result: any): Promise<void> => {
    if (result === undefined)
      return

    if (isLoading) return
    setIsLoading(true)

    const url = new URL(result)
    const questionId = url.searchParams.get('questionId')

    if (questionId === null) {
      alert('잘못된 형식의 QR코드입니다. 다시시도해 주세요.')
      window.location.replace(location.pathname)
      return
    }

    router.replace(`/solvequiz?questionId=${questionId}`)
  }

  const questionId = searchParams.get('questionId')
  if (questionId !== null) {
    void onUpdate(`https://example.com/?questionId=${questionId}`)
    return <></>
  }

  return (
    <main className={style.container}>
      <div className={style.camera}>
        <div className={style.guide}></div>
        <QRScannerComponent stopStream={isLoading} onUpdate={(_, result) => { void onUpdate(result) }} />
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

export default QuizScanPage
