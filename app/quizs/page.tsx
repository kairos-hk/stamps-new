import style from './style.module.scss'

import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import Link from 'next/link'
import QuestionList from '../../components/QuestionList'
import QuizScanButton from '../../components/QuizScanButton'

const MyStampsPage: FC = () => {
  return (
    <main className={style.container}>
      <TitleBar>문제 목록</TitleBar>
      <div className={style.boothList}>
        <QuestionList />
      </div>

      <div>
        <QuizScanButton />
        <Link className={style.quiz} href="/">
          돌아가기
        </Link>
      </div>
    </main>
  )
}

export default MyStampsPage
