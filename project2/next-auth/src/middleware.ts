import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    // getting the route at which the user is at
    const path = request.nextUrl.pathname;

    /*
    we have two cases that is either user can visit a public path or a private path. Handle them both
    */

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get("token")?.value || '';

    // case: if user is already logged in and trying to visit any of the public paths
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ],
}