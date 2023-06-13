'use client'
import { useState, type FC, type ComponentProps } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type QRScannerComponentOriginal from 'react-qr-barcode-scanner'
import { Button } from '../../components/Button'
import { useSearchParams } from 'next/navigation'

const QRScannerComponent = dynamic<ComponentProps<typeof QRScannerComponentOriginal>>(
  async () => await import('react-qr-barcode-scanner'),
  { ssr: false }
)

interface StampData {
  userName: string
  userGroup: string
  userPhone: string
}

const QRScanPage: FC = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const onUpdate = async (result: any): Promise<void> => {
    if (result === undefined)
      return

    if (isLoading) return
    setIsLoading(true)

    const url = new URL(result)
    const userId = url.searchParams.get('userId')

    if (userId === null) {
      alert('잘못된 형식의 QR코드입니다. 다시시도해 주세요.')
      window.location.replace(location.pathname)
      return
    }

    const userDataRes = await fetch('/api/stamp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId
      })
    })

    if (!userDataRes.ok) {
      alert('이미 찍은 스탬프입니다.')
      window.location.replace(location.pathname)
      return
    }

    const userData = (await userDataRes.json()).userData as StampData
    alert(`스탬프를 찍었습니다.\n\n[방문객 정보]\n성함: ${userData.userName}\n소속(학교명): ${userData.userGroup}\n전화번호: ${userData.userPhone}`)
    window.location.replace(location.pathname)
  }

  const userId = searchParams.get('userId')
  if (userId !== null) {
    void onUpdate(`https://example.com/?userId=${userId}`)
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

      <Link className={style.backBtn} href="/boothstamps">
        <Button>
          돌아가기
        </Button>
      </Link>
    </main>
  )
}

export default QRScanPage
