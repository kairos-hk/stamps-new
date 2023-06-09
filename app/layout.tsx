import './globals.css'
import { type Metadata } from 'next'
import { type ReactNode, type FC } from 'react'

import { Noto_Sans_KR } from 'next/font/google'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700']
})

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) =>
  <html lang="ko" className={`w-full h-full flex justify-center ${notoSansKR.className}`}>
    <body className='w-full h-full max-w-md p-5 flex justify-stretch flex-col gap-5'>
      {children}
    </body>
  </html>

export default RootLayout

export const metadata: Metadata = {
  title: '2023 경상북도교육청 직업교육박람회 스템프',
  description: '체험하고~ 선물도 받자!'
}
