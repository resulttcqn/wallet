import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("supabase-auth-token"); // Supabase 로그인 세션 확인

  // 보호할 페이지 목록
  const protectedRoutes = ["/exchange", "/profile"];

  // 현재 요청한 URL이 보호된 페이지인지 확인
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // 로그인하지 않은 상태에서 보호된 페이지에 접근하면 로그인 페이지로 리다이렉트
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정 (선택)
export const config = {
  matcher: ["/exchange", "/adm"], // 보호할 경로 목록
};
