'use client'

import style from './style.module.scss'

import { useRouter } from 'next/navigation'
import { type FormEvent, type FC, useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import Link from 'next/link'
import { Logo } from '../Logo'

export interface UserData {
  userName: string
  userGroup: string
  userPhone: string
}

interface Props {
  user: UserData
}

const UserInfoForm: FC<Props> = ({ user }) => {
  const router = useRouter()
  const [userName, setUserName] = useState(user.userName)
  const [userGroup, setUserGroup] = useState(user.userGroup)
  const [userPhone, setUserPhone] = useState(user.userPhone)
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
      const res = await fetch('/api/login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userGroup,
          userPhone
        })
      })

      if (!res.ok) {
        alert('이미 해당 전화번호로 가입된 사용자가 있습니다. 모든 입력란을 정확히 입력했는지 다시 한번 확인해 주세요.')
        setIsDisabled(false)
        return
      }

      alert('수정되었습니다.')
      router.push('/')
    })()
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
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
      </div>

      <Button
        type="submit"
        disabled={isDisabled}>
        수정하기
      </Button>
      <Link className={style.admin} href="/">
        돌아가기
      </Link>
    </form>
  )
}

export default UserInfoForm
