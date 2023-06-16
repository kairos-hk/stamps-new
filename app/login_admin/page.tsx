'use client'

import style from './style.module.scss'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { type FormEvent, type FC, useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

const LoginPage: FC = () => {
  const searchParams = useSearchParams()
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    if (isDisabled) return
    setIsDisabled(true)

    if (userName.length < 1 || userPhone.length < 1) {
      alert('입력란을 모두 입력해 주세요')
      setIsDisabled(false)
      return
    }

    void (async () => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userGroup: 'a',
          userPhone,
          isAdmin: true
        })
      })

      if (!res.ok) {
        alert('모든 입력란을 정확히 입력했는지 다시 한번 확인해 주세요.')
        setIsDisabled(false)
        return
      }

      const redirectTarget =
        searchParams.get('redirect') ?? '/'

      window.location.assign(redirectTarget)
    })()
  }

  return (
    <main className={style.container}>
      <form onSubmit={onSubmit}>
        <div className={style.inputs}>
          <h1>
            <Logo />
          </h1>

          <label>
            <p>아이디</p>
            <Input
              type="text"
              value={userName}
              disabled={isDisabled}
              placeholder="여기를 눌러 아이디 입력"
              maxLength={30}
              onChange={(e) => { setUserName(e.target.value) }} />
          </label>

          <label>
            <p>비밀번호</p>
            <Input
              value={userPhone}
              disabled={isDisabled}
              placeholder="여기를 눌러 비밀번호 입력"
              maxLength={30}
              onChange={(e) => { setUserPhone(e.target.value) }} />
          </label>

          <div className={style.credit}>
            <p>주최</p>
            <a className={style.gbe} target="_blank" href="https://gbe.kr">
              <Image className={style.gbe} src="/assets/gbe.png" height="28" width="130" alt="경상북도교육청" />
            </a>
            <hr />
            <p>제작</p>
            <a className={style.gbsw} target="_blank" href="https://gbsw.hs.kr">
              <Image className={style.gbsw} src="/assets/gbsw.png" height="30" width="130" alt="경북소프트웨어고" />
            </a>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isDisabled}>
          관리자 로그인
        </Button>
        <Link className={style.admin} href={`/login?redirect=${searchParams.get('redirect') ?? '/'}`}>
          돌아가기
        </Link>
      </form>
    </main>
  )
}

export default LoginPage
