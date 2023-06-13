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

  const booths = await db
    .select('booths.booth_name', 'stamps.stamp_id')
    .from('booths')
    .orderBy('booths.booth_id')
    .leftJoin('stamps', function () {
      this.on('booths.booth_id', 'stamps.booth_id')
      this.andOnVal('stamps.user_id', tokenData.userId)
    })

  const boothData = booths.map((booth) => ({
    boothName: booth.booth_name,
    isStamped: booth.stamp_id !== null
  }))

  return NextResponse.json(boothData)
}
