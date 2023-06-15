import { type NextRequest, NextResponse } from 'next/server'
import { getDB } from '../../../utils/dbconn'
import { verifyToken } from '../../../utils/jwt'

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const cookieStore = request.cookies
  const sessionToken = cookieStore.get('SESSION_TOKEN')?.value ?? ''

  const db = getDB()
  const body = await request.json()
  const tokenData = verifyToken(sessionToken)

  if (tokenData === undefined)
    return NextResponse.json({ success: false, message: 'Login first' }, { status: 400 })

  await db
    .delete()
    .whereIn('stamp_id', body.selected)
    .andWhere('user_id', tokenData.userId)
    .from('stamps')

  return NextResponse.json({ success: true })
}
