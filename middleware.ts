import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";
  let shouldRedirect = false;

  if (host.startsWith("www.")) {
    url.hostname = host.replace(/^www\./, "");
    shouldRedirect = true;
  }

  if (url.pathname === "/**" || url.pathname === "/%2A%2A") {
    url.pathname = "/";
    shouldRedirect = true;
  }

  return shouldRedirect ? NextResponse.redirect(url, 308) : NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"]
};
