import style from './style.module.scss'

import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import { getDB } from '../../utils/dbconn'
import { SolveFrom } from '../../components/SolveForm'
import { verifyToken } from '../../utils/jwt'
import { cookies } from 'next/dist/client/components/headers'
import Alert from '../../components/Alert'

export interface QuestionData {
  questionId: number
  questionContent: string
  isCorrect: boolean
}

const getQuestion = async (): Promise<QuestionData | undefined> => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('SESSION_TOKEN')?.value ?? ''

  const db = getDB()
  const tokenData = verifyToken(sessionToken)

  if (tokenData === undefined)
    return undefined

  const question = await db
    .select('questions.question_id', 'questions.question_content', 'questions.correct_question')
    .from('questions')
    .orderByRaw('RAND()')
    .leftJoin('quizs', function () {
      this.on('quizs.question_id', 'questions.question_id')
      this.andOnVal('quizs.user_id', tokenData.userId)
    })
    .whereNull('quizs.quizs_id')
    .first()

  if (question === undefined)
    return undefined

  return {
    questionId: question.question_id,
    questionContent: question.question_content,
    isCorrect: question.correct_question
  }
}

/* @ts-expect-error Async Server Component */
const MyStampsPage: FC = async () => {
  const question = await getQuestion()

  if (question === undefined)
    return <Alert message="이미 모든 문제를 해결하였습니다!"/>

  return (
    <main className={style.container}>
      <TitleBar>문제 풀기</TitleBar>
      <SolveFrom question={question}/>
    </main>
  )
}

export default MyStampsPage
