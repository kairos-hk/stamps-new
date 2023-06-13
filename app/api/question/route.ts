import { NextResponse } from 'next/server'
import { verifyToken } from '../../../utils/jwt'
import { getDB } from '../../../utils/dbconn'
import { cookies } from 'next/dist/client/components/headers'

export const GET = async (): Promise<NextResponse> => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('SESSION_TOKEN')?.value ?? ''

  const db = getDB()
  const tokenData = verifyToken(sessionToken)

  if (tokenData === undefined)
    return NextResponse.json([])

  const questions = await db
    .select('questions.question_name', 'quizs.quizs_id')
    .from('questions')
    .orderBy('questions.question_id')
    .leftJoin('quizs', function () {
      this.on('quizs.question_id', 'questions.question_id')
      this.andOnVal('quizs.user_id', tokenData.userId)
    })

  const boothData = questions.map((question) => ({
    questionName: question.question_name,
    isStamped: question.quizs_id !== null
  }))

  return NextResponse.json(boothData)
}
