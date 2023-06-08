'use client'
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
  const { data, isLoading, mutate } = useSWR<BoothData[]>('/api/booth', fetcher, {
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
    <section className="flex flex-col gap-5">
      <button onClick={() => { void mutate() }} disabled={isLoading} className='w-full border px-4 py-2'>
        {isLoading ? '불러오는 중' : '새로고침'}
      </button>
      <ul className="w-full grid grid-cols-3 gap-5">
        {data?.map((booth, i) => (
          <li key={i}>
          <div
            onClick={calcSysPass(i)}
            className="w-full border aspect-square">
              {booth.isStamped && (
                <div
                  className="border-4 border-red-600 w-full h-full rounded-full flex justify-center items-center font-bold text-red-600 -rotate-45">
                  체험완료!
                </div>
              )}
            </div>
            <p className="text-center">{booth.boothName}</p>
          </li>
        ))}
      </ul>
      <button className="border" onClick={logout}>로그아웃(임시)</button>
    </section>
  )
}

export default BoothList
