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
    <main>
      <div>
        <Image
          alt="스템프용 QR 코드"
          height={100} width={100} src={qrCode}
          style={{ imageRendering: 'pixelated' }} />

        <Link href="/mystamps">
          <button>
            돌아가기
          </button>
        </Link>
      </div>
      <p>* QR 코드를 부스에 보여주세요</p>
    </main>
  )
}

export default MyQRPage
