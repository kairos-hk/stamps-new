import style from './style.module.scss'
import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import UserInfoForm, { type UserData } from '../../components/UserinfoForm'
import { getDB } from '../../utils/dbconn'
import { cookies } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'

const getUserData = async (): Promise<UserData | undefined> => {
  const db = getDB()
  const cookieStorage = cookies()
  const sessionToken = cookieStorage.get('SESSION_TOKEN')

  if (sessionToken === undefined)
    return undefined

  const tokenPayload = verifyToken(sessionToken.value)
  if (tokenPayload === undefined)
    return undefined

  const userData = await db
    .select('user_name', 'user_group', 'user_phone')
    .from('users')
    .where('user_id', tokenPayload.userId)
    .first()

  return {
    userName: userData.user_name,
    userGroup: userData.user_group,
    userPhone: userData.user_phone
  }
}

/* @ts-expect-error Async Server Component */
const UserInfoPage: FC = async () => {
  const userData = await getUserData()

  if (userData === undefined)
    return <></>

  return (
    <main className={style.container}>
      <TitleBar>마이페이지</TitleBar>
      <UserInfoForm user={userData}/>
    </main>
  )
}

export default UserInfoPage
