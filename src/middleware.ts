import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuthToken } from './lib/auth'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    if(!token){
        return NextResponse.redirect(new URL("/authentication/login", request.url));
    }
    const verifyToken=await verifyAuthToken(token)
    if(!verifyToken){
        return NextResponse.redirect(new URL("/authentication/logout", request.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/','/dashboard/:path*'],
}