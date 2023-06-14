'use client'
import style from './style.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  disableUserInfo?: boolean
}

export const TitleBar: FC <Props> = ({ children, disableUserInfo = false }) => {
  const onClick = (): void => {
    document.cookie = 'SESSION_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.assign('/')
  }

  return (
    <nav className={style.titlebar}>
      <button
        onClick={() => { onClick() }}>
        <Image
          className={style.logout}
          src="/assets/logout.svg"
          alt="로그아웃"
          width={24}
          height={24} />
      </button>

      <h1>{children}</h1>

      {!disableUserInfo && (
        <Link href="/userinfo">
          <Image
            className={style.user}
            src="/assets/user.svg"
            alt="유저정보 수정"
            width={24}
            height={24} />
        </Link>
      )}

      {disableUserInfo && (
        <div></div>
      )}
    </nav>
  )
}
