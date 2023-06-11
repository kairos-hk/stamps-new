import './global.scss'
import style from './layout.module.scss'

import clsx from 'clsx'
import { type Metadata } from 'next'
import { type ReactNode, type FC } from 'react'

import { Noto_Sans_KR } from 'next/font/google'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500']
})

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) =>
  <html lang="ko" className={clsx(notoSansKR.className, style.container)}>
    <body className={style.content}>
      {children}
    </body>
  </html>

export default RootLayout

export const metadata: Metadata = {
  title: '2023 경상북도교육청 직업교육박람회 스템프',
  description: '체험하고~ 선물도 받자!'
}
