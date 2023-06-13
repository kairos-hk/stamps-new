import style from './style.module.scss'

import { type FC } from 'react'
import Link from 'next/link'
import StampList from '../../components/StampList'
import { Button } from '../../components/Button'
import { TitleBar } from '../../components/TitleBar'

const BoothStampsPage: FC = () => {
  return (
    <main className={style.container}>
      <TitleBar disableUserInfo>스탬프 기록</TitleBar>
      <div className={style.stampList}>
        <StampList />
      </div>
      <Link href="/qrscan">
        <Button>
          스탬프 QR코드 스캔
        </Button>
      </Link>
    </main>
  )
}

export default BoothStampsPage
