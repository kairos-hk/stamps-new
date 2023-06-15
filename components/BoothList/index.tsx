'use client'
import clsx from 'clsx'
import style from './style.module.scss'

import { useState, type FC } from 'react'
import useSWR from 'swr'
import { Button } from '../Button'

const fetcher = async (url: string): Promise<any> =>
  await fetch(url).then(async (res) => await res.json())

interface BoothData {
  boothName: string
  stampId: number | null
}

const BoothList: FC = () => {
  const [sysPass, setSysPass] = useState('')
  const [deleteSelect, setDeleteSelect] = useState<number[]>([])
  const [deleteMode, setDeleteMode] = useState(false)
  const { data, mutate } = useSWR<BoothData[]>('/api/booth', fetcher, {
    refreshInterval: 10
  })

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

      await mutate()

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

  return (
    <section>
      {deleteMode && (
        <div className={style.deleteMode}>
          <p>[삭제모드] 삭제할 스탬프를 터치로 선택 후 삭제 버튼을 누르세요 (선택됨: {deleteSelect.length}개)</p>
          <Button onClick={deleteStamp}>삭제</Button>
        </div>
      )}

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
  )
}

export default BoothList
