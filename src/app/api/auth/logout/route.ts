import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("a")
    const response =  NextResponse.json({ success: true });
    response.cookies.set({
        name: "jwt",
        value: "",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0, // 1 day
      });

    return response
}