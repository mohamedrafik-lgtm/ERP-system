import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Basic middleware without security features
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
