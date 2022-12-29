import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateSessionCookie } from './lib/auth';

export function middleware(request: NextRequest) {

  const cookie = request.cookies.get('__fweb3')?.value
  const valid = validateSessionCookie(cookie || '')
  console.log({ valid })

  const response = NextResponse.next()

  return response
}
