import { sign, verify } from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import { type TokenPayload } from './token'

const TOKEN_SECRET = process.env.TOKEN_SECRET ?? randomUUID()

export const createToken = (userId: number, boothId?: number): string =>
  sign({ userId, boothId }, TOKEN_SECRET)

export const verifyToken = (token: string): TokenPayload | undefined => {
  try {
    return verify(token, TOKEN_SECRET) as TokenPayload
  } catch { return undefined }
}
