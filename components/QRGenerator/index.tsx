import style from './style.module.scss'

import { cookies, headers } from 'next/dist/client/components/headers'
import { toDataURL } from 'qrcode'
import { type FC } from 'react'
import { verifyToken } from '../../utils/jwt'
import Image from 'next/image'

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
export const QRGenerator: FC = async () => {
  const qrCode = await createQRCode()

  return (
    <Image
      className={style.qr}
      alt="스탬프용 QR 코드"
      height={100} width={100} src={qrCode} />
  )
}
