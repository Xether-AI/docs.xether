import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLatestStableVersion } from "@/config/versions";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // If someone visits /docs without a version, redirect to latest stable
  if (pathname === "/docs" || pathname === "/docs/") {
    const latestStable = getLatestStableVersion();
    return NextResponse.redirect(new URL(latestStable.path, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*"],
};
