import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    // As we are using cookies to store the token, we need to get the token from the cookies
    const token = request.cookies.get('auth')?.value;
    const isLoginPage = request.nextUrl.pathname === '/login';

    // Public paths that don't require authentication
    const publicPaths = ['/login', '/api/auth/login'];
    if (publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    try {
        // If no token and not on login page, redirect to login
        if (!token && !isLoginPage) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        if (token) {
            try {
                // Verify JWT token
                const verified = await jwtVerify(
                    token,
                    new TextEncoder().encode(process.env.JWT_SECRET)
                );

                // If on login page with valid token, redirect to home
                if (isLoginPage) {
                    return NextResponse.redirect(new URL('/', request.url));
                }
            } catch (error) {
                console.error('Token verification failed:', error.message);
                // Only redirect to login if not already on login page
                if (!isLoginPage) {
                    const response = NextResponse.redirect(new URL('/login', request.url));
                    response.cookies.delete('auth');
                    return response;
                }
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        // Only redirect to login if not already on login page and not accessing API
        if (!isLoginPage && !request.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
