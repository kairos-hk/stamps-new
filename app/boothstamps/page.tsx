import { type FC } from 'react'
import { getDB } from '../../utils/dbconn'
import { cookies } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'
import Link from 'next/link'
import StampList from '../../components/StampList'

const getBoothName = async (): Promise<string | undefined> => {
  const db = getDB()
  const cookieStorage = cookies()
  const sessionToken = cookieStorage.get('SESSION_TOKEN')

  if (sessionToken === undefined)
    return undefined

  const tokenPayload = verifyToken(sessionToken.value)
  if (tokenPayload === undefined)
    return undefined

  const boothData = await db
    .select('booth_name')
    .from('booths')
    .where('booth_id', tokenPayload.boothId)
    .first()

  return boothData.booth_name
}

/* @ts-expect-error Async Server Component */
const BoothStampsPage: FC = async () => {
  const boothName = await getBoothName()

  return (
    <main className="h-full flex flex-col gap-5">
      <h1 className="flex-none">{boothName ?? '우리 부스'}의 스탬프</h1>
      <div className="grow shrink overflow-auto">
        <StampList />
      </div>
      <Link href="/qrscan" className="w-full flex-none">
        <button className='w-full border px-4 py-2'>
          스탬프 QR코드 스캔
        </button>
      </Link>
    </main>
  )
}

export default BoothStampsPage
