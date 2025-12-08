// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🔒 保護したいパスのリスト (ログインが必要)
const protectedPaths = ['/dashboard']; 

// 🔓 認証なしでアクセスを許可するパスのリスト (ルートパス / を公開)
const publicPaths = ['/', '/login', '/signup']; 

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  const path = request.nextUrl.pathname;

  // 1. 保護されたパス (/dashboard) へのアクセス制御
  if (protectedPaths.includes(path)) {
    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. 認証パスへのアクセス制御 (ログイン済みの場合)
  if (publicPaths.includes(path) && authToken) {
    // ログイン済みユーザーが、/ や /login にアクセスしようとした場合
    const dashboardUrl = new URL('/dashboard', request.url); 
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};