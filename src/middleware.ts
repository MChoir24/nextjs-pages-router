import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = true; // Replace with actual login check logic

  if (!isLogin) {
    // Redirect to login page if not logged in
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else {
    // Allow the request to proceed if logged in
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/products/:path*"],
};
