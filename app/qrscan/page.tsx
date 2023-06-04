'use client'
import { useState, type FC } from 'react'
import style from './style.module.scss'
import QRScannerComponent from 'react-qr-barcode-scanner'
import Link from 'next/link'

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
    <main className={`${style.qr} relative`}>
      <p className="absolute top-0 z-10 bg-black bg-opacity-25 px-4 py-2 text-center text-white w-full">
        방문객의 스탬프 QR코드를 스캔하세요
      </p>

      <QRScannerComponent stopStream={isLoading} onUpdate={(_, result) => { void onUpdate(result) }} />
      {isLoading && (
        <div className="fixed z-20 flex justify-center items-center text-white bg-black bg-opacity-75 top-0 left-0 w-full h-full">
          스탬프 찍는중...
        </div>
      )}

      <Link href="/boothstamps" className="absolute z-10 bottom-0 w-full">
        <button className='w-full border px-4 py-2 bg-white'>
          돌아가기
        </button>
      </Link>
    </main>
  )
}

export default QRScanPage
