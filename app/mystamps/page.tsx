import { type FC } from 'react'
import { getDB } from '../../utils/dbconn'
import BoothList from '../../components/BoothList'
import { cookies } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'
import Link from 'next/link'

const getUserName = async (): Promise<string | undefined> => {
  const db = getDB()
  const cookieStorage = cookies()
  const sessionToken = cookieStorage.get('SESSION_TOKEN')

  if (sessionToken === undefined)
    return undefined

  const tokenPayload = verifyToken(sessionToken.value)
  if (tokenPayload === undefined)
    return undefined

  const userData = await db
    .select('user_name')
    .from('users')
    .where('user_id', tokenPayload.userId)
    .first()

  return userData.user_name
}

/* @ts-expect-error Async Server Component */
const MyStampsPage: FC = async () => {
  const userName = await getUserName()

  return (
    <main>
      <h1>{userName ?? '나'}의 스탬프</h1>
      <div>
        <BoothList />
      </div>
      <Link href="/myqr">
        <button>
          스탬프 QR코드 표시
        </button>
      </Link>
    </main>
  )
}

export default MyStampsPage
