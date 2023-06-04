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
    <main className="h-full flex flex-col gap-5">
      <h1 className="flex-none">{userName ?? '나'}의 스탬프</h1>
      <div className="grow shrink overflow-auto">
        <BoothList />
      </div>
      <Link href="/myqr" className="w-full flex-none">
        <button className='w-full border px-4 py-2'>
          스탬프 QR코드 표시
        </button>
      </Link>
    </main>
  )
}

export default MyStampsPage
