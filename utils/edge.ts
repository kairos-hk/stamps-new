import { type RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { type TokenPayload } from './token'
import { decode } from 'jsonwebtoken'

export enum EdgeUserType {
  UNLOGINED,
  VISITOR,
  BOOTH_MANAGER
}

export const edgeDecodeJWTImpl = (jwtToken: string): TokenPayload | undefined => {
  const payload = decode(jwtToken) as TokenPayload | null

  if (payload === null)
    return undefined

  return payload
}

export const edgeDecodeJWT = (jwtToken: string | undefined): TokenPayload | undefined => {
  if (jwtToken === undefined)
    return undefined

  try {
    return edgeDecodeJWTImpl(jwtToken)
  } catch { return undefined }
}

export const edgeGetUserType = (cookies: RequestCookies): EdgeUserType => {
  const sessionToken = cookies.get('SESSION_TOKEN')
  const payload = edgeDecodeJWT(sessionToken?.value)

  if (sessionToken === undefined)
    return EdgeUserType.UNLOGINED

  if (payload === undefined)
    return EdgeUserType.UNLOGINED

  if (payload.boothId === undefined)
    return EdgeUserType.VISITOR

  else
    return EdgeUserType.BOOTH_MANAGER
}
