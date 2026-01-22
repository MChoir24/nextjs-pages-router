import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextProxy,
  NextRequest,
  NextResponse,
} from "next/server";

// Define paths that require admin role
const onlyAdminPaths: string[] = ["/dashboard", "/dashboard/settings"];

export default function withAuth(
  middleware: NextProxy,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
        return NextResponse.redirect(loginUrl);
      }

      // Check for admin role on specific paths
      if (onlyAdminPaths.includes(pathname) && token.role !== "admin") {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
      }
    }
    return middleware(req, next);
  };
}
