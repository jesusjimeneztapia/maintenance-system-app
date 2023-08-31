import { NextResponse } from 'next/server'

const OPERADOR_ROUTES = ['/failure-report', '/maintenance-request']

export function middleware(request) {
  const token = request.cookies.get('token')
  const role = request.cookies.get('role')
  if (token == null || role == null) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { pathname } = request.nextUrl
  if (role === 'operator' && pathname !== '/') {
    if (!OPERADOR_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/machines/:path*',
    '/activities/:path*',
    '/stores/:path*',
    '/work-orders/:path*',
    '/schedule/:path*',
    '/historical/:path*',
    '/indicators/:path*',
    '/failure-report/:path*',
    '/maintenance-request/:path*',
  ],
}
