import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

// Protect specific routes with authentication
export default withAuth(mainMiddleware, [
  "/profile",
  "/products",
  "/dashboard",
]);
