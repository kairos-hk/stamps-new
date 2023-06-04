import Image from 'next/image'
import { type FC } from 'react'
import { cookies, headers } from 'next/dist/client/components/headers'
import { verifyToken } from '../../utils/jwt'
import { toDataURL } from 'qrcode'
import Link from 'next/link'

const createQRCode = async (): Promise<string> => {
  const cookieStorage = cookies()
  const headerStorage = headers()

  const sessionToken = cookieStorage.get('SESSION_TOKEN')

  if (sessionToken === undefined)
    return ''

  const tokenPayload = verifyToken(sessionToken.value)
  if (tokenPayload === undefined)
    return ''

  const qrURL = `https://${headerStorage.get('host') ?? ''}/qrscan?userId=${tokenPayload.userId}`

  return await toDataURL(qrURL, {
    errorCorrectionLevel: 'H',
    margin: 0,
    scale: 1
  })
}

/* @ts-expect-error Async Server Component */
const MyQRPage: FC = async () => {
  const qrCode = await createQRCode()

  return (
    <main className="h-full flex flex-col gap-5">
      <h1 className="flex-none">스탬프 QR 보기</h1>
      <div className="grow shrink overflow-auto flex flex-col gap-5">
        <Image
          className="w-full"
          alt="스템프용 QR 코드"
          height={100} width={100} src={qrCode}
          style={{ imageRendering: 'pixelated' }} />

        <p className="px-4 py-2 bg-black bg-opacity-5">QR 코드를 부스에 보여주세요</p>
      </div>
      <Link href="/mystamps" className="w-full flex-none">
        <button className='w-full border px-4 py-2'>
          돌아가기
        </button>
      </Link>
    </main>
  )
}

export default MyQRPage
