'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FormEvent, type FC, useState } from 'react'

const LoginPage: FC = () => {
  const router = useRouter()
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
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          userGroup,
          userPhone
        })
      })

      if (!res.ok) {
        alert('이미 해당 전화번호로 가입된 사용자가 있습니다. 모든 입력란을 정확히 입력했는지 다시 한법 확인해 주세요.')
        setIsDisabled(false)
        return
      }

      router.replace('/')
    })()
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <div>
          <h1>
            <Image src="/assets/logo.png" width={200} height={55} alt="2023 경상북도교육청 직업교육박람회" />
          </h1>

          <label>
            <p>성명</p>
            <input
              type="text"
              value={userName}
              disabled={isDisabled}
              placeholder="박ㅇㅇ (띄워쓰기 없이 입력)"
              maxLength={30}
              onChange={(e) => { setUserName(e.target.value.replace(' ', '')) }} />
          </label>

          <label>
            <p>소속명 (학교명)</p>
            <input
              type="text"
              value={userGroup}
              disabled={isDisabled}
              placeholder="ㅇㅇ중학교 (띄워쓰기 없이 입력)"
              maxLength={30}
              onChange={(e) => { setUserGroup(e.target.value.replace(' ', '')) }} />
          </label>

          <label>
            <p>전화번호</p>
            <input
              type="tel"
              value={userPhone}
              disabled={isDisabled}
              placeholder="01012345678 (- 없이 입력)"
              maxLength={30}
              onChange={(e) => { setUserPhone(e.target.value.replace(/[^\d]/, '')) }} />
          </label>

          <div>
            <div>
              <p>주최</p>
              <a target="_blank" href="https://gbe.kr">
                <Image src="/assets/gbe.png" height="20" width="120" alt="경상북도교육청" />
              </a>
            </div>
            <hr />
            <div>
              <p>제작</p>
              <a target="_blank" href="https://gbsw.hs.kr">
                <Image src="/assets/gbsw.png" height="20" width="120" alt="경북소프트웨어고" />
              </a>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isDisabled}>
          시작하기
        </button>
      </form>
    </main>
  )
}

export default LoginPage
