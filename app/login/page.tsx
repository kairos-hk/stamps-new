'use client'

import style from './style.module.scss'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { type FormEvent, type FC, useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import Link from 'next/link'
import { Logo } from '../../components/Logo'

const LoginPage: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userName, setUserName] = useState('')
  const [userGroup, setUserGroup] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault()

    if (isDisabled) return
    setIsDisabled(true)

    if (userName.length < 1 || userGroup.length < 1 || userPhone.length < 1) {
      alert('입력란을 모두 입력해 주세요')
      setIsDisabled(false)
      return
    }

    if (!/^\d{11}$/.test(userPhone)) {
      alert('전화번호가 잘못 입력되었습니다')
      setIsDisabled(false)
      return
    }

    void (async () => {
      const res = await fetch('/api/checkusr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userPhone
        })
      }).then(async (res) => await res.json())

      if (res.type === 'WRONG') {
        alert('이미 해당 전화번호로 가입된 사용자가 있습니다. 모든 입력란을 정확히 입력했는지 다시 한번 확인해 주세요.')
        setIsDisabled(false)
        return
      }

      const redirectTarget =
        searchParams.get('redirect') ?? '/'

      if (res.type === 'ALREADY') {
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName,
            userGroup,
            userPhone
          })
        })

        window.location.assign(redirectTarget)
      }

      if (res.type === 'NEW') {
        const data = btoa(encodeURIComponent(JSON.stringify({ userName, userGroup, userPhone })))
        router.replace(`/tos?data=${data}&redirect=${redirectTarget}`)
      }
    })()
  }

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.inputs}>
          <h1>
            <Logo />
          </h1>

          <label>
            <p>성명</p>
            <Input
              type="text"
              value={userName}
              disabled={isDisabled}
              placeholder="박OO (띄워쓰기 없이 입력)"
              maxLength={30}
              onChange={(e) => { setUserName(e.target.value.replace(' ', '')) }} />
          </label>

          <label>
            <p>소속명 (학교명)</p>
            <Input
              type="text"
              value={userGroup}
              disabled={isDisabled}
              placeholder="OO중학교 (띄워쓰기 없이 입력)"
              maxLength={30}
              onChange={(e) => { setUserGroup(e.target.value.replace(' ', '')) }} />
          </label>

          <label>
            <p>전화번호</p>
            <Input
              type="tel"
              value={userPhone}
              disabled={isDisabled}
              placeholder="01012345678 (- 없이 입력)"
              maxLength={30}
              onChange={(e) => { setUserPhone(e.target.value.replace(/[^\d]/, '')) }} />
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

        <div className={style.buttons}>
          <Button
            type="submit"
            disabled={isDisabled}>
            시작하기
          </Button>
          <Link className={style.admin} href={`/login_admin?redirect=${searchParams.get('redirect') ?? '/'}`}>
            관리자 로그인
          </Link>
          <div></div>
        </div>
      </form>
    </main>
  )
}

export default LoginPage
