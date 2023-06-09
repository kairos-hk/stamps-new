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
    <section className="flex flex-col gap-5">
      <ul className="w-full grid grid-cols-3 gap-5">
        {data?.map((booth, i) => (
          <li key={i}>
          <div
            onClick={calcSysPass(i)}
            className="w-full aspect-square flex justify-center items-center bg-secondary rounded font-bold">
              <p className="p-3 text-center">{booth.boothName}</p>

              {booth.isStamped && (
                <div
                  className="border-4 border-red-600 w-full h-full rounded-full flex justify-center items-center font-bold text-red-600 -rotate-45">
                  체험완료!
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BoothList
