import style from './style.module.scss'

import { type FC } from 'react'
import { getDB } from '../../utils/dbconn'
import { cookies } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'
import Link from 'next/link'
import StampList from '../../components/StampList'
import { Button } from '../../components/Button'

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
    <main className={style.container}>
      <h1>{boothName ?? '우리 부스'}의 스탬프</h1>
      <div className={style.stampList}>
        <StampList />
      </div>
      <Link href="/qrscan">
        <Button>
          스탬프 QR코드 스캔
        </Button>
      </Link>
    </main>
  )
}

export default BoothStampsPage
