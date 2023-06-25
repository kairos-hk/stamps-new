import { cookies, headers } from 'next/dist/client/components/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { verifyToken } from '../../../utils/jwt'
import { toDataURL } from 'qrcode'

const getQR = async (): Promise<string> => {
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

export const GET = async (requset: NextRequest): Promise<NextResponse> => {
  const qr = await getQR()

  return NextResponse.json({ qr })
}
