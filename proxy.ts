import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'


// this function can be marked async when used await inside
// this is the logic function
export async function proxy( request: NextRequest){
    const path = request.nextUrl.pathname

    const isPublic = path === '/login' || path === '/signup';

    const isProtected = path === '/profile';

    const token = request.cookies.get('token')?.value

    if(isPublic && token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if(isProtected && !token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}


// On which path you want to run the middleware
export const config = {
    matcher: [
        '/',
    '/login',
    '/profile',
    '/signup',
    '/verifyEmail'
    ]
}