import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger admin y APIs del admin
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    const authHeader = request.headers.get("authorization");

    if (authHeader) {
      const base64 = authHeader.split(" ")[1];
      const [user, password] = atob(base64).split(":");

      if (
        user === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.next();
      }
    }

    return new Response("Acceso restringido", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};