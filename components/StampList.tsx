'use client'
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
    <section className="flex flex-col gap-5">
      <table className="w-full">
        <thead>
          <tr>
            <th className="pb-2">이름</th>
            <th className="pb-2 text-left">소속</th>
            <th className="pb-2 pr-4 text-right">전화번호</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((stamp, i) => (
            <tr className="text-inter" onClick={calcSysPass(i)} key={i}>
              <td className="py-1 px-0">
                <div className="rounded-l bg-secondary pl-4 py-6">
                  {stamp.userName}
                </div>
              </td>
              <td className="py-1 px-0">
                <div className="bg-secondary py-6">
                  {stamp.userGroup}
                </div>
              </td>
              <td className="py-1 px-0">
                <div className="rounded-r bg-secondary pr-4 py-6 text-right text-primary">
                  {stamp.userPhone}
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
