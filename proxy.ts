import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { auth } from './lib/auth';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log(pathname);

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const reverseProtectedRoutes = [
        "/login",
        "/register",
    ];

    // geust routes only protection
    if (reverseProtectedRoutes.includes(pathname)) {
        if (!accessToken) {
            return NextResponse.next();
        }

        const decoded = auth(accessToken);
        if (decoded?.id) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        cookieStore.delete("accessToken");
        return NextResponse.next();
    }

    // protected routes protection
    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const decoded = auth(accessToken);
    if (!decoded?.id) {
        cookieStore.delete("accessToken");
        return NextResponse.redirect(new URL('/login', request.url));
    }


    return NextResponse.next();

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (Chrome devtools & system requests)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)',
  ],
}