import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Fetch the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define public and protected routes
  const authRoutes = ["/login", "/register  ", "/reset"];
  const protectedRoutes = ["/dashboard"];

  // Clone the URL for manipulation
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from auth routes
  if (token && authRoutes.includes(pathname)) {
    url.pathname = "/dashboard"; // Redirect to dashboard if logged in
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users away from protected routes
  if (!token && protectedRoutes.includes(pathname)) {
    url.pathname = "/login"; // Redirect to login if not logged in
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard"],
};