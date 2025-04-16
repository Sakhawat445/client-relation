import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define the secret for token verification (ensure this matches your environment variable name)
const secret = process.env.NEXTAUTH_SECRET; // Use process.env.AUTH_SECRET if that's set on Vercel

export async function middleware(req: NextRequest) {
  // Get the authentication token
  const token = await getToken({ req, secret });

  // Define routes
  const authRoutes = ["/login", "/register", "/reset"];
  const protectedRoutes = [
    "/dashboard",
    "/customers",
    "/orders",
    "/analytics",
    "/documents",
    "/profile",
  ];

  // Clone the URL for redirection purposes
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from auth routes to dashboard
  if (token && authRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users from protected routes to login
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Proceed with the request if no redirects are needed
  return NextResponse.next();
}

// Configure the matcher to specify which routes trigger the middleware
export const config = {
  matcher: [
    "/",                // Root path (public by default)
    "/login",
    "/register",
    "/reset",
    "/dashboard",
    "/customers/:path*", // Supports dynamic subpaths (e.g., /customers/123)
    "/orders/:path*",
    "/analytics/:path*",
    "/documents/:path*",
    "/profile/:path*",
  ],
};