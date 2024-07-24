import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const user = auth();
  const protectedPaths = ["/dashboard"];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !user
  ) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
