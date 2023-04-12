import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // const auth = req.cookies.get('auth')?.value;
  const auth = 'asd';
  axios.defaults.headers.common['Authorization'] = '' + auth;
  console.log('@MIDDLEWARE', axios.defaults.headers.common);
  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' };
