'use client'

import { useState, type FC } from 'react'
import style from './style.module.scss'
import { Button } from '../Button'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

export const TosList: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false)
  const [isThirdPartyChecked, setIsThirdPartyChecked] = useState(false)
  const [isPrivacyPolicyExpanded, setIsPrivacyPolicyExpanded] = useState(false)
  const [isThirdPartyExpanded, setIsThirdPartyExpanded] = useState(false)

  const onCheckAll = (): void => {
    if (!isPrivacyPolicyChecked || !isThirdPartyChecked) {
      setIsPrivacyPolicyChecked(true)
      setIsThirdPartyChecked(true)
    } else {
      setIsPrivacyPolicyChecked(false)
      setIsThirdPartyChecked(false)
    }
  }

  const onSubmit = (): void => {
    if (!isPrivacyPolicyChecked || !isThirdPartyChecked) return

    const rawData = searchParams.get('data')
    const redirectTarget = '/notice?redirect=' + (searchParams.get('redirect') ?? '/')

    if (rawData === null) {
      alert('오류 발생!')
      router.push('/')
      return
    }

    const body = decodeURIComponent(atob(rawData))
    void (async () => {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })

      window.location.assign(redirectTarget)
    })()
  }

  return (
    <>
      <div className={style.tos}>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={onCheckAll}
                checked={isPrivacyPolicyChecked && isThirdPartyChecked} />
              <div className={style.checkbox}></div>

              <p>전체동의</p>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={() => { setIsPrivacyPolicyChecked(!isPrivacyPolicyChecked) }}
                checked={isPrivacyPolicyChecked} />
              <div className={style.checkbox}></div>

              <p>개인정보 수집 및 정보 이용</p>
              <button
                className={clsx(style.expand, isPrivacyPolicyExpanded && style.expanded)}
                onClick={() => { setIsPrivacyPolicyExpanded(!isPrivacyPolicyExpanded) }}>
                <Image src="/assets/chevron.svg" alt="상세 열기/닫기" width={20} height={20} />
              </button>
            </label>

            {isPrivacyPolicyExpanded && (
              <pre>
                - 개인정보의 수집 및 이용 목적 : 2023 경상북도직업교육박람회 이벤트 참여<br />
                - 수집하는 기본 개인정보 항목 : 이름, 학교명, 전화번호<br />
                - 개인정보의 보유 및 이용기간 : 6개월<br />
                - 개인정보 수집 및 이용에 대한 동의를 거부할 수 있습니다. 다만, 동의를 거부할 경우 회원가입 및 이벤트 참여에 제한을 받을 수 있습니다.<br />
              </pre>
            )}
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={() => { setIsThirdPartyChecked(!isThirdPartyChecked) }}
                checked={isThirdPartyChecked} />
              <div className={style.checkbox}></div>

              <p>개인정보 제 3자 제공</p>

              <button className={clsx(style.expand, isThirdPartyExpanded && style.expanded)} onClick={() => { setIsThirdPartyExpanded(!isThirdPartyExpanded) }}>
                <Image src="/assets/chevron.svg" alt="상세 열기/닫기" width={20} height={20} />
              </button>
            </label>

            {isThirdPartyExpanded && (
              <pre>
                - 개인정보를 제공받는 자 : 부스운영 직업계고등학교<br />
                - 개인정보를 제공 받는 자의 개인정보 이용 목적 : 진학 관련 상담<br />
                - 제공되는 개인정보 항목 : 이름, 학교명, 전화번호<br />
                - 개인정보의 보유 및 이용 기간: 6개월<br />
                - 귀하는 개인정보 제 3자 제공에 대한 동의를 거부할 권리가 있습니다. 다만, 동의를 거부할 경우 회원가입 및 이벤트 참여에 제한을 받을 수 있습니다.<br />
              </pre>
            )}
          </li>
        </ul>
      </div>

      <div>
        <Button onClick={onSubmit} disabled={!isPrivacyPolicyChecked || !isThirdPartyChecked}>
          동의하고 시작하기
        </Button>

        <Link className={style.back} href="/">
          뒤로가기
        </Link>
      </div>
    </>
  )
}
