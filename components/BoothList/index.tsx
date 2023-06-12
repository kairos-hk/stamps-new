'use client'
import style from './style.module.scss'

import { useState, type FC } from 'react'
import useSWR from 'swr'

const fetcher = async (url: string): Promise<any> =>
  await fetch(url).then(async (res) => await res.json())

interface BoothData {
  boothName: string
  isStamped: boolean
}

const BoothList: FC = () => {
  const [sysPass, setSysPass] = useState('')
  const { data } = useSWR<BoothData[]>('/api/booth', fetcher, {
    refreshInterval: 10
  })

  const calcSysPass = (index: number) => () => {
    const nextSysPass = `${(index + 1)}${sysPass}`.slice(0, 4)
    if (nextSysPass === '1324')
      logout()

    setSysPass(nextSysPass)
  }

  const logout = (): void => {
    document.cookie = 'SESSION_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.reload()
  }

  return (
    <section>
      <ul className={style.grid}>
        {data?.map((booth, i) => (
          <li key={i} onClick={calcSysPass(i)}>
            <p>{booth.boothName}</p>

            {booth.isStamped && (
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
