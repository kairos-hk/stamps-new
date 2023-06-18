import style from './style.module.scss'

import { type FC } from 'react'
import { getDB } from '../../utils/dbconn'
import BoothList from '../../components/BoothList'
import { cookies } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'
import { ModalButton } from '../../components/ModalButton'
import { QRGenerator } from '../../components/QRGenerator'
import { TitleBar } from '../../components/TitleBar'
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
    <main className={style.container}>
      <TitleBar>{userName ?? '나'}의 스탬프</TitleBar>
      <div className={style.boothList}>
        <BoothList />
      </div>

      <div>
        <ModalButton
          notice="QR 코드를 부스에 보여주세요"
          buttonLabel="스탬프 QR코드 표시">
          <QRGenerator />
        </ModalButton>

        <Link className={style.quiz} href="/">
          돌아가기
        </Link>
      </div>
    </main>
  )
}

export default MyStampsPage
