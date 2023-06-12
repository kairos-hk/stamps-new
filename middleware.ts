import { NextResponse, type NextMiddleware } from 'next/server'
import { EdgeUserType, edgeGetUserType } from './utils/edge'

const allowedPaths = {
  [EdgeUserType.UNLOGINED]: ['/login'],
  [EdgeUserType.VISITOR]: ['/mystamps'],
  [EdgeUserType.BOOTH_MANAGER]: ['/boothstamps', '/qrscan']
}

export const middleware: NextMiddleware = async (request) => {
  const userType = edgeGetUserType(request.cookies)

  if (allowedPaths[userType].includes(request.nextUrl.pathname))
    return NextResponse.next()

  if (userType === EdgeUserType.UNLOGINED)
    return NextResponse.redirect(new URL('/login', request.url))

  if (userType === EdgeUserType.VISITOR)
    return NextResponse.redirect(new URL('/mystamps', request.url))

  if (userType === EdgeUserType.BOOTH_MANAGER)
    return NextResponse.redirect(new URL('/boothstamps', request.url))
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|icon.png|assets).*)'
}
