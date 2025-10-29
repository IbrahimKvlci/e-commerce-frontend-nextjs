import AuthService from "@/services/auth/AuthService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const authService=new AuthService();

    const loginResponse=await authService.login({email,password})

    const response = NextResponse.json({ success: true });
    response.cookies.set({
        name: "token",
        value: loginResponse.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

    return response
}