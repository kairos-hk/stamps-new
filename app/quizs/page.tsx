import style from './style.module.scss'

import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import Link from 'next/link'
import { Button } from '../../components/Button'
import QuestionList from '../../components/QuestionList'

const MyStampsPage: FC = () => {
  return (
    <main className={style.container}>
      <TitleBar>문제 목록</TitleBar>
      <div className={style.boothList}>
        <QuestionList />
      </div>

      <div>
        <Link href="/quizscan">
          <Button altColor>
            퀴즈 QR 스캔하기
          </Button>
        </Link>

        <Link className={style.quiz} href="/">
          돌아가
        </Link>
      </div>
    </main>
  )
}

export default MyStampsPage
