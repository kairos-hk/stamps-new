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
  const { data, isLoading, mutate } = useSWR<StampData[]>('/api/stamp', fetcher, {
    refreshInterval: 10
  })

  const calcSysPass = (index: number) => () => {
    const nextSysPass = `${(index + 1)}${sysPass}`.slice(0, 4)
    if (nextSysPass === '1324') {
      document.cookie = 'SESSION_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      window.location.reload()
    }

    setSysPass(nextSysPass)
  }

  return (
    <section className="flex flex-col gap-5">
      <button onClick={() => { void mutate() }} disabled={isLoading} className='w-full border px-4 py-2'>
        {isLoading ? '불러오는 중' : '새로고침'}
      </button>

      <table className="border-collaps w-full">
        <thead className="border-b-2">
          <tr>
            <th>이름</th>
            <th>소속</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((stamp, i) => (
            <tr onClick={calcSysPass(i)} key={i}>
              <td>{stamp.userName}</td>
              <td>{stamp.userGroup}</td>
              <td>{stamp.userPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default StampList
