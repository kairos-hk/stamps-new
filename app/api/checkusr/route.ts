import { getDB } from '../../../utils/dbconn'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const db = getDB()
  const body = await request.json()

  const foundUser = await db
    .select('user_name')
    .where('user_phone', body.userPhone)
    .from('users')
    .first()

  if (foundUser?.user_name === undefined)
    return NextResponse.json({ type: 'NEW' })

  if (foundUser.user_name !== body.userName)
    return NextResponse.json({ type: 'WRONG' })

  return NextResponse.json({ type: 'ALREADY' })
}
