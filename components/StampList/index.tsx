'use client'
import style from './style.module.scss'
import { useState, type FC } from 'react'
import useSWR from 'swr'

const fetcher = async (url: string): Promise<any> =>
  await fetch(url).then(async (res) => await res.json())

interface StampData {
  userName: string
  userGroup: string
  userPhone: string
}

const StampList: FC = () => {
  const [sysPass, setSysPass] = useState('')
  const { data } = useSWR<StampData[]>('/api/stamp', fetcher, {
    refreshInterval: 10
  })

  const logout = (): void => {
    document.cookie = 'SESSION_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.reload()
  }

  const calcSysPass = (index: number) => () => {
    const nextSysPass = `${(index + 1)}${sysPass}`.slice(0, 4)
    if (nextSysPass === '1324')
      logout()

    setSysPass(nextSysPass)
  }

  return (
    <section className={style.container}>
      <table>
        <thead>
          <tr>
            <th><div>이름</div></th>
            <th><div>소속</div></th>
            <th><div>전화번호</div></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((stamp, i) => (
            <tr onClick={calcSysPass(i)} key={i}>
              <td>
                <div>
                  {stamp.userName}
                </div>
              </td>
              <td>
                <div>
                  {stamp.userGroup}
                </div>
              </td>
              <td>
                <div>
                  <a href={`tel:${stamp.userPhone}`}>
                    {stamp.userPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3')}
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default StampList
