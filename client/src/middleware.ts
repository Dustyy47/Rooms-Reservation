import jwtDecode from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authRoutes } from './pages/_app';

export async function middleware(req: NextRequest) {
  let isJwtValid = false;
  try {
    isJwtValid = !!(await jwtDecode(req.cookies.get('auth')?.value || ''));
  } catch (e) {}

  if (authRoutes.includes(req.nextUrl.pathname)) {
    if (isJwtValid) {
      const newRoute = req.nextUrl.clone();
      newRoute.pathname = '/rooms';
      return NextResponse.redirect(newRoute);
    }
  } else {
    if (!isJwtValid) {
      const newRoute = req.nextUrl.clone();
      newRoute.pathname = '/auth/login';
      return NextResponse.redirect(newRoute);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' };
