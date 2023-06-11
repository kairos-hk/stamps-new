'use client'
import { useState, type FC, type ComponentProps } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type QRScannerComponentOriginal from 'react-qr-barcode-scanner'

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
      window.location.reload()
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
      window.location.reload()
      return
    }

    const userData = (await userDataRes.json()).userData as StampData
    alert(`스탬프를 찍었습니다.\n\n[방문객 정보]\n성함: ${userData.userName}\n소속(학교명): ${userData.userGroup}\n전화번호: ${userData.userPhone}`)
    window.location.reload()
  }

  return (
    <main className={style.qr}>
      <p>
        방문객의 스탬프 QR코드를 스캔하세요
      </p>

      <QRScannerComponent stopStream={isLoading} onUpdate={(_, result) => { void onUpdate(result) }} />
      {isLoading && (
        <div>
          스탬프 찍는중...
        </div>
      )}

      <Link href="/boothstamps">
        <button>
          돌아가기
        </button>
      </Link>
    </main>
  )
}

export default QRScanPage
