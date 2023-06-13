import style from './style.module.scss'

import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import { getDB } from '../../utils/dbconn'
import Link from 'next/link'
import { SolveFrom } from '../../components/SolveForm'

export interface QuestionData {
  questionId: number
  questionContent: string
  isCorrect: boolean
}

const getQuestion = async (questionId: number): Promise<QuestionData | undefined> => {
  if (isNaN(questionId))
    return undefined

  const db = getDB()
  const question = await db
    .select('question_content', 'correct_question')
    .from('questions')
    .where('question_id', questionId)
    .first()

  if (question === undefined)
    return undefined

  return {
    questionId,
    questionContent: question.question_content,
    isCorrect: question.correct_question
  }
}

/* @ts-expect-error Async Server Component */
const MyStampsPage: FC<any> = async ({ searchParams }) => {
  const question = await getQuestion(parseInt(atob(searchParams.questionId)))

  if (question === undefined)
    return <Link href="/">부정이 감지되었습니다. 여기를 눌러 돌아가기</Link>

  return (
    <main className={style.container}>
      <TitleBar>문제 풀기</TitleBar>
      <SolveFrom question={question}/>
    </main>
  )
}

export default MyStampsPage
