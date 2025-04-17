import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const authRoutes = ["/login", "/register", "/reset"];
  const protectedRoutes = [
    "/dashboard",
    "/customers",
    "/orders",
    "/analytics",
    "/documents",
    "/profile",
  ];

  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (token && authRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",               
    "/login",
    "/register",
    "/reset",
    "/dashboard",
    "/customers/:path*", 
    "/orders/:path*",
    "/analytics/:path*",
    "/documents/:path*",
    "/profile/:path*",
  ],
};