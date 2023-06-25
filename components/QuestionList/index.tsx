'use client'
import style from './style.module.scss'

import { useState, type FC, useEffect } from 'react'
import { Button } from '../Button'
import clsx from 'clsx'

interface QuestionData {
  questionName: string
  quizsId: number | null
}

const QuestionList: FC = () => {
  const [sysPass, setSysPass] = useState('')
  const [deleteSelect, setDeleteSelect] = useState<number[]>([])
  const [deleteMode, setDeleteMode] = useState(false)
  const [data, setData] = useState<QuestionData[] | undefined>(undefined)

  const fetchData = (): void => {
    void (async () => {
      const data = await fetch('/api/question')
        .then(async (res) => await res.json())

      setData(data)
    })()
  }

  const logout = (): void => {
    document.cookie = 'SESSION_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.reload()
  }

  const deleteStamp = (): void => {
    void (async () => {
      await fetch('/api/quizdel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selected: deleteSelect.map((v) => data?.[v].quizsId)
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

  return (
    <section>
      {deleteMode && (
        <div className={style.deleteMode}>
          <p>[삭제모드] 삭제할 스탬프를 터치로 선택 후 삭제 버튼을 누르세요 (선택됨: {deleteSelect.length}개)</p>
          <Button onClick={deleteStamp}>삭제</Button>
        </div>
      )}

      <div className={style.topbar}>
        {data !== undefined && (
          <p><b>{data.filter((v) => v.quizsId !== null).length}</b>완료</p>
        )}

        {data === undefined && (
          <p className={style.dummy}></p>
        )}
      </div>

      <ul className={style.grid}>
        {data?.map((question, i) => (
          <li key={i} className={clsx(deleteSelect.includes(i) && style.deleteBg)} onClick={calcSysPass(i)}>
            <p>{question.questionName}</p>

            {question.quizsId !== null && (
              <div className={style.doneBg}>
                <div className={style.doneStamp}>
                  <p>
                    해결!
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

export default QuestionList
