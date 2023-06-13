import { type NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../utils/jwt'
import { getDB } from '../../../utils/dbconn'

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json()
  const cookieStore = request.cookies
  const sessionToken = cookieStore.get('SESSION_TOKEN')?.value ?? ''

  const db = getDB()
  const tokenData = verifyToken(sessionToken)

  if (tokenData === undefined)
    return NextResponse.json([])

  const foundQuiz = await db
    .select('quizs_id')
    .from('quizs')
    .where('user_id', tokenData.userId)
    .andWhere('question_id', body.questionId)
    .first()

  if (foundQuiz?.quizs_id !== undefined) {
    return NextResponse.json({ success: false, message: 'ALREADY_QUIZED' }, {
      status: 400
    })
  }

  await db
    .insert({
      user_id: tokenData.userId,
      question_id: body.questionId
    }).into('quizs')

  return NextResponse.json({ success: true })
}

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  const cookieStore = request.cookies
  const sessionToken = cookieStore.get('SESSION_TOKEN')?.value ?? ''

  const db = getDB()
  const tokenData = verifyToken(sessionToken)

  if (tokenData === undefined)
    return NextResponse.json({ success: false, message: 'Login first' }, { status: 400 })

  await db
    .delete()
    .where('user_id', tokenData.userId)
    .from('quizs')

  return NextResponse.json({ success: true })
}
