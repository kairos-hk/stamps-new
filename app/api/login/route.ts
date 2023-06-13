import { type NextRequest, NextResponse } from 'next/server'
import { getDB } from '../../../utils/dbconn'
import { createToken } from '../../../utils/jwt'

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const db = getDB()
  const body = await request.json()

  const foundUser = await db
    .select('user_id', 'user_name', 'booth_id')
    .where('user_phone', body.userPhone)
    .from('users')
    .first()

  if (foundUser !== undefined && foundUser.user_name !== body.userName) {
    return NextResponse.json({ success: false, message: 'ALREADY_REGISTED' }, {
      status: 400
    })
  }

  let userId = foundUser?.user_id
  const boothId = foundUser?.booth_id

  if (userId === undefined) {
    if (body.isAdminLogin === true) {
      return NextResponse.json({
        success: false,
        message: 'NOT_REGISTED_ADMIN'
      }, { status: 400 })
    }

    [userId] = await db
      .insert({
        user_name: body.userName,
        user_group: body.userGroup,
        user_phone: body.userPhone
      })
      .into('users')
      .returning('user_id')
  }

  const sessionToken = createToken(userId, boothId ?? undefined)
  return NextResponse.json(
    { success: true, isRegist: foundUser === undefined },
    { headers: { 'Set-Cookie': `SESSION_TOKEN=${sessionToken};path=/` } }
  )
}
