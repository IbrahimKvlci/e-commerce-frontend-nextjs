import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuthToken } from '../lib/auth'

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('jwt')?.value
    if (!token) {
        return NextResponse.redirect(new URL("/authentication/login?reason=unauthorized", request.url));
    }
    const verifyToken = await verifyAuthToken(token)
    if (!verifyToken) {
        return NextResponse.redirect(new URL("/authentication/logout", request.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/profile", "/cart", "/checkout", "/orders", "/profile/addresses", "/wish-list"],
}