import { type NextRequest, NextResponse } from 'next/server'
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

  const stamps = await db
    .select('users.user_name', 'users.user_group', 'users.user_phone')
    .from('stamps')
    .join('users', 'stamps.user_id', 'users.user_id')
    .where('stamps.booth_id', tokenData.boothId)
    .orderBy('stamps.stamp_id', 'desc')

  const stampData = stamps.map((stamp) => ({
    userName: stamp.user_name,
    userGroup: stamp.user_group,
    userPhone: stamp.user_phone
  }))

  return NextResponse.json(stampData)
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json()
  const cookieStore = request.cookies
  const sessionToken = cookieStore.get('SESSION_TOKEN')?.value ?? ''

  const db = getDB()
  const tokenData = verifyToken(sessionToken)

  if (tokenData === undefined)
    return NextResponse.json([])

  const foundStamp = await db
    .select('stamp_id')
    .from('stamps')
    .where('user_id', body.userId)
    .andWhere('booth_id', tokenData.boothId)
    .first()

  if (foundStamp?.stamp_id !== undefined) {
    return NextResponse.json({ success: false, message: 'ALREADY_STAMPED' }, {
      status: 400
    })
  }

  await db
    .insert({
      user_id: body.userId,
      booth_id: tokenData.boothId
    }).into('stamps')

  const user = await db
    .select('user_name', 'user_group', 'user_phone')
    .from('users')
    .where('user_id', body.userId)
    .first()

  const userData = {
    userName: user.user_name,
    userGroup: user.user_group,
    userPhone: user.user_phone
  }

  return NextResponse.json({ success: true, userData })
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
    .from('stamps')

  return NextResponse.json({ success: true })
}
