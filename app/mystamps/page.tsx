import style from './style.module.scss'

import { type FC } from 'react'
import { getDB } from '../../utils/dbconn'
import BoothList from '../../components/BoothList'
import { cookies } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'
import { ModalButton } from '../../components/ModalButton'
import { QRGenerator } from '../../components/QRGenerator'

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
    <main className={style.container}>
      <h1>{userName ?? '나'}의 스탬프</h1>
      <div className={style.boothList}>
        <BoothList />
      </div>

      <ModalButton
        notice="QR 코드를 부스에 보여주세요"
        buttonLabel="스탬프 QR코드 표시">
        <QRGenerator />
      </ModalButton>
    </main>
  )
}

export default MyStampsPage
