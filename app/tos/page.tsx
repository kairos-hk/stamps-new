import style from './style.module.scss'

import { type FC } from 'react'
import { TitleBar } from '../../components/TitleBar'
import { TosList } from '../../components/TosList'

/* @ts-expect-error Async Server Component */
const MyStampsPage: FC = async () => {
  return (
    <main className={style.container}>
      <TitleBar disableUserInfo>약관동의</TitleBar>
      <TosList />
    </main>
  )
}

export default MyStampsPage
