'use client'

import style from './style.module.scss'

import { useState, type FC, useEffect } from 'react'
import Image from 'next/image'

export const QRGenerator: FC = () => {
  const [qr, setQR] = useState<string | undefined>(undefined)
  useEffect(() => {
    void (async () => {
      const { qr } = await fetch('/api/qr')
        .then(async (res) => await res.json())

      setQR(qr)
    })()
  }, [])

  if (qr === undefined)
    return <div className={style.dummyOuter}><div className={style.dummy}></div></div>

  return (
    <Image
      className={style.qr}
      alt=""
      height={100} width={100} src={qr} />
  )
}
