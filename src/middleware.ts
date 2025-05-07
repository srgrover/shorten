// Set runtime to nodejs to avoid Prisma Edge Runtime issues
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth.config";

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Get the user session
  const session = await auth();

  // Skip auth check for API auth routes
  const isApiAuthRoute = path.startsWith('/api/auth');
  
  // Handle specific cases
  
  // Redirect logged-in users from login page to dashboard
  if (path.startsWith('/auth/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // If it's an API auth route, don't apply auth check
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  
  // If the user is not authenticated and trying to access a protected route,
  // redirect to the login page
  if (!session && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Otherwise, continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/api/auth/:path*']
};
