'use client'
import clsx from 'clsx'
import style from './style.module.scss'

import { useState, type FC, useEffect } from 'react'
import { Button } from '../Button'
import Link from 'next/link'
import { QRGenerator } from '../QRGenerator'
import { ModalButton } from '../ModalButton'
import Image from 'next/image'

interface BoothData {
  boothName: string
  stampId: number | null
}

const BoothList: FC = () => {
  const [sysPass, setSysPass] = useState('')
  const [deleteSelect, setDeleteSelect] = useState<number[]>([])
  const [deleteMode, setDeleteMode] = useState(false)
  const [data, setData] = useState<BoothData[] | undefined>(undefined)
  const [, setLastFetch] = useState<Date | undefined>()
  const [lastFetchMsg, setLastFetchMsg] = useState('방금전')
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = (): void => {
    setIsLoading(true)
    void (async () => {
      const data = await fetch('/api/booth')
        .then(async (res) => await res.json())

      setData(data)
      setLastFetch(new Date())
      setIsLoading(false)
    })()
  }

  const logout = (): void => {
    document.cookie = 'SESSION_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.reload()
  }

  const deleteStamp = (): void => {
    void (async () => {
      await fetch('/api/stampdel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selected: deleteSelect.map((v) => data?.[v].stampId)
        })
      })

      fetchData()

      setDeleteMode(false)
      setDeleteSelect([])
    })()
  }

  const calcSysPass = (index: number) => () => {
    if (deleteMode) {
      if (deleteSelect.includes(index)) {
        setDeleteSelect([
          ...deleteSelect.filter((v) => v !== index)
        ])

        return
      }

      setDeleteSelect([
        ...deleteSelect,
        index
      ])
      return
    }

    const nextSysPass = `${(index + 1)}${sysPass}`.slice(0, 10)
    console.log('Debug pass: %d', nextSysPass)

    if (nextSysPass.startsWith('1324'))
      logout()

    if (nextSysPass.startsWith('449151'))
      setDeleteMode(true)

    setSysPass(nextSysPass)
  }

  useEffect(fetchData, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setLastFetch((lastFetch) => {
        if (lastFetch === undefined)
          return

        const last = lastFetch.getTime()
        const now = new Date().getTime()
        const diff = now - last

        const lastFetchMsg =
          diff < 60 * 1000
            ? '방금전'
            : `${Math.floor(diff / (60 * 1000))}분 전`

        setLastFetchMsg(lastFetchMsg)

        return lastFetch
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className={style.boothList}>
        <section>
          {deleteMode && (
            <div className={style.deleteMode}>
              <p>[삭제모드] 삭제할 스탬프를 터치로 선택 후 삭제 버튼을 누르세요 (선택됨: {deleteSelect.length}개)</p>
              <Button onClick={deleteStamp}>삭제</Button>
            </div>
          )}

          <div className={style.topbar}>
            {data !== undefined && (
              <>
                <p><b>{data.filter((v) => v.stampId !== null).length}</b>완료</p>
                <p>{lastFetchMsg} <button onClick={fetchData}><Image className={clsx(isLoading && style.loading)} width={14} height={14} alt="새로고침" src="/assets/refresh.svg" /></button></p>
              </>
            )}

            {data === undefined && (
              <p className={style.dummy}></p>
            )}
          </div>

          <ul className={style.grid}>
            {data?.map((booth, i) => (
              <li key={i} className={clsx(deleteSelect.includes(i) && style.deleteBg)} onClick={calcSysPass(i)}>
                <p>{booth.boothName}</p>

                {booth.stampId !== null && (
                  <div className={style.doneBg}>
                    <div className={style.doneStamp}>
                      <p>
                        완료!
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}

            {data === undefined && (
              <>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
                <li className={style.dummy}></li>
              </>
            )}
          </ul>
        </section>
      </div>

      <div>
        <ModalButton
          onClose={fetchData}
          notice="QR 코드를 부스에 보여주세요"
          buttonLabel="스탬프 QR코드 표시">
          <QRGenerator />
        </ModalButton>

        <Link className={style.quiz} href="/">
          돌아가기
        </Link>
      </div>
    </>
  )
}

export default BoothList
