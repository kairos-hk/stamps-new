'use client'
import style from './style.module.scss'

import { useState, type FC } from 'react'
import useSWR from 'swr'
import { Button } from '../Button'
import clsx from 'clsx'

const fetcher = async (url: string): Promise<any> =>
  await fetch(url).then(async (res) => await res.json())

interface QuestionData {
  questionName: string
  quizsId: number | null
}

const QuestionList: FC = () => {
  const [sysPass, setSysPass] = useState('')
  const [deleteSelect, setDeleteSelect] = useState<number[]>([])
  const [deleteMode, setDeleteMode] = useState(false)
  const { data, mutate } = useSWR<QuestionData[]>('/api/question', fetcher, {
    refreshInterval: 10
  })

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
